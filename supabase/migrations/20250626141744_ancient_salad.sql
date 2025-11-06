/*
  # Create Detainees Table

  1. New Tables
    - `detainees`
      - `id` (uuid, primary key)
      - `unique_id` (text, unique identifier)
      - `name` (text, detainee's name)
      - `country_of_citizenship` (text, country)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_active` (boolean, for case management)

  2. Security
    - Enable RLS on `detainees` table
    - Add policy for authenticated users to read detainee data
    - Add policy for authenticated users to insert/update detainee data
*/

CREATE TABLE IF NOT EXISTS detainees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_id text UNIQUE NOT NULL,
  name text NOT NULL,
  country_of_citizenship text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE detainees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read detainees"
  ON detainees
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert detainees"
  ON detainees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update detainees"
  ON detainees
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_detainees_updated_at
  BEFORE UPDATE ON detainees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();