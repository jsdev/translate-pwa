/*
  # Create Intake Sessions Table

  1. New Tables
    - `intake_sessions`
      - `id` (uuid, primary key)
      - `officer_id` (uuid, references officers)
      - `detainee_id` (uuid, references detainees)
      - `location` (text, where intake occurred)
      - `started_at` (timestamp)
      - `completed_at` (timestamp, nullable)
      - `status` (enum, 'in_progress', 'completed', 'cancelled')
      - `notes` (text, additional notes)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `intake_sessions` table
    - Add policies for authenticated access
*/

-- Create enum for intake status
DO $$ BEGIN
  CREATE TYPE intake_status AS ENUM ('in_progress', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS intake_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  officer_id uuid NOT NULL REFERENCES officers(id),
  detainee_id uuid NOT NULL REFERENCES detainees(id),
  location text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status intake_status DEFAULT 'in_progress',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS intake_sessions_officer_id_idx ON intake_sessions(officer_id);
CREATE INDEX IF NOT EXISTS intake_sessions_detainee_id_idx ON intake_sessions(detainee_id);
CREATE INDEX IF NOT EXISTS intake_sessions_status_idx ON intake_sessions(status);
CREATE INDEX IF NOT EXISTS intake_sessions_started_at_idx ON intake_sessions(started_at);

ALTER TABLE intake_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read intake sessions"
  ON intake_sessions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert intake sessions"
  ON intake_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update intake sessions"
  ON intake_sessions
  FOR UPDATE
  TO authenticated
  USING (true);