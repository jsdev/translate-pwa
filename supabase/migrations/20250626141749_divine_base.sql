/*
  # Create Recordings Table

  1. New Tables
    - `recordings`
      - `id` (uuid, primary key)
      - `audio_data` (bytea, binary audio data)
      - `audio_url` (text, optional URL if using storage)
      - `speaker_id` (uuid, references either officers or detainees)
      - `speaker_type` (enum, 'officer' or 'detainee')
      - `duration_seconds` (numeric, recording duration)
      - `file_format` (text, audio format like 'webm', 'mp3')
      - `file_size_bytes` (bigint, file size)
      - `created_at` (timestamp)
      - `session_id` (uuid, groups related recordings)

  2. Security
    - Enable RLS on `recordings` table
    - Add policies for authenticated access
*/

-- Create enum for speaker type
DO $$ BEGIN
  CREATE TYPE speaker_type AS ENUM ('officer', 'detainee');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audio_data bytea,
  audio_url text,
  speaker_id uuid NOT NULL,
  speaker_type speaker_type NOT NULL,
  duration_seconds numeric(8,2) DEFAULT 0,
  file_format text DEFAULT 'webm',
  file_size_bytes bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  session_id uuid,
  
  -- Ensure we have either audio_data or audio_url
  CONSTRAINT audio_data_check CHECK (
    (audio_data IS NOT NULL) OR (audio_url IS NOT NULL)
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS recordings_speaker_id_idx ON recordings(speaker_id);
CREATE INDEX IF NOT EXISTS recordings_speaker_type_idx ON recordings(speaker_type);
CREATE INDEX IF NOT EXISTS recordings_session_id_idx ON recordings(session_id);
CREATE INDEX IF NOT EXISTS recordings_created_at_idx ON recordings(created_at);

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read recordings"
  ON recordings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert recordings"
  ON recordings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update recordings"
  ON recordings
  FOR UPDATE
  TO authenticated
  USING (true);