/*
  # Create Transcripts Table

  1. New Tables
    - `transcripts`
      - `id` (uuid, primary key)
      - `recording_id` (uuid, references recordings)
      - `intake_session_id` (uuid, references intake_sessions)
      - `original_text` (text, original spoken text)
      - `translated_text` (text, translated text)
      - `original_language` (text, detected/specified language)
      - `target_language` (text, translation target language)
      - `confidence_score` (numeric, translation confidence 0-1)
      - `transcript_metadata` (jsonb, additional metadata)
      - `created_at` (timestamp)
      - `processing_status` (enum, 'pending', 'completed', 'failed')

  2. Security
    - Enable RLS on `transcripts` table
    - Add policies for authenticated access
*/

-- Create enum for processing status
DO $$ BEGIN
  CREATE TYPE processing_status AS ENUM ('pending', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recording_id uuid NOT NULL REFERENCES recordings(id) ON DELETE CASCADE,
  intake_session_id uuid REFERENCES intake_sessions(id),
  original_text text NOT NULL,
  translated_text text,
  original_language text NOT NULL,
  target_language text,
  confidence_score numeric(3,2) DEFAULT 0.0,
  transcript_metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  processing_status processing_status DEFAULT 'pending'
);

-- Create indexes
CREATE INDEX IF NOT EXISTS transcripts_recording_id_idx ON transcripts(recording_id);
CREATE INDEX IF NOT EXISTS transcripts_intake_session_id_idx ON transcripts(intake_session_id);
CREATE INDEX IF NOT EXISTS transcripts_original_language_idx ON transcripts(original_language);
CREATE INDEX IF NOT EXISTS transcripts_processing_status_idx ON transcripts(processing_status);
CREATE INDEX IF NOT EXISTS transcripts_created_at_idx ON transcripts(created_at);

-- Create GIN index for JSONB metadata searches
CREATE INDEX IF NOT EXISTS transcripts_metadata_gin_idx ON transcripts USING gin(transcript_metadata);

ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read transcripts"
  ON transcripts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert transcripts"
  ON transcripts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transcripts"
  ON transcripts
  FOR UPDATE
  TO authenticated
  USING (true);