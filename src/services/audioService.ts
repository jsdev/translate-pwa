import { supabase } from '../lib/supabase';
import type { Recording, Transcript } from '../lib/supabase';

export class AudioService {
  // Convert audio blob to base64 for storage
  private async blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  // Record audio and return blob
  async startRecording(): Promise<MediaRecorder> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    return mediaRecorder;
  }

  // Save recording to Supabase
  async saveRecording(
    audioBlob: Blob,
    speakerId: string,
    speakerType: 'officer' | 'detainee',
    sessionId?: string
  ): Promise<Recording> {
    const audioBuffer = await this.blobToArrayBuffer(audioBlob);
    
    const recording = {
      audio_data: audioBuffer,
      speaker_id: speakerId,
      speaker_type: speakerType,
      duration_seconds: 0, // Will be calculated
      file_format: 'webm',
      file_size_bytes: audioBlob.size,
      session_id: sessionId
    };

    const { data, error } = await supabase
      .from('recordings')
      .insert(recording)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Save transcript linked to recording
  async saveTranscript(
    recordingId: string,
    originalText: string,
    translatedText: string,
    originalLanguage: string,
    targetLanguage: string,
    intakeSessionId?: string,
    metadata: Record<string, unknown> = {}
  ): Promise<Transcript> {
    const transcript = {
      recording_id: recordingId,
      intake_session_id: intakeSessionId,
      original_text: originalText,
      translated_text: translatedText,
      original_language: originalLanguage,
      target_language: targetLanguage,
      confidence_score: 0.95, // Mock confidence score
      transcript_metadata: metadata,
      processing_status: 'completed' as const
    };

    const { data, error } = await supabase
      .from('transcripts')
      .insert(transcript)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get recordings for a session
  async getSessionRecordings(sessionId: string): Promise<Recording[]> {
    const { data, error } = await supabase
      .from('recordings')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get transcripts for a recording
  async getRecordingTranscripts(recordingId: string): Promise<Transcript[]> {
    const { data, error } = await supabase
      .from('transcripts')
      .select('*')
      .eq('recording_id', recordingId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get all transcripts for an intake session
  async getSessionTranscripts(sessionId: string): Promise<Transcript[]> {
    const { data, error } = await supabase
      .from('transcripts')
      .select(`
        *,
        recordings!inner(session_id)
      `)
      .eq('recordings.session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}

export const audioService = new AudioService();