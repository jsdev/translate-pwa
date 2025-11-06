import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Officer {
  id: string;
  unique_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Detainee {
  id: string;
  unique_id: string;
  name: string;
  country_of_citizenship: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Recording {
  id: string;
  audio_data?: ArrayBuffer;
  audio_url?: string;
  speaker_id: string;
  speaker_type: 'officer' | 'detainee';
  duration_seconds: number;
  file_format: string;
  file_size_bytes: number;
  created_at: string;
  session_id?: string;
}

export interface IntakeSession {
  id: string;
  officer_id: string;
  detainee_id: string;
  location?: string;
  started_at: string;
  completed_at?: string;
  status: 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface Transcript {
  id: string;
  recording_id: string;
  intake_session_id?: string;
  original_text: string;
  translated_text?: string;
  original_language: string;
  target_language?: string;
  confidence_score: number;
  transcript_metadata: Record<string, unknown>;
  created_at: string;
  processing_status: 'pending' | 'completed' | 'failed';
}