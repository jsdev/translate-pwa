/*
  # Create Officers Table

  1. New Tables
    - `officers`
      - `id` (uuid, primary key)
      - `unique_id` (text, unique identifier like badge number)
      - `name` (text, officer's name)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_active` (boolean, for deactivating officers)

  2. Security
    - Enable RLS on `officers` table
    - Add policy for authenticated users to read officer data
    - Add policy for authenticated users to insert/update officer data
*/

CREATE TABLE IF NOT EXISTS officers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_id text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE officers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read officers"
  ON officers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert officers"
  ON officers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update officers"
  ON officers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_officers_updated_at
  BEFORE UPDATE ON officers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();