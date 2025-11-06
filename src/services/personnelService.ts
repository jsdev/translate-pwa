import { supabase } from '../lib/supabase';
import type { Officer, Detainee, IntakeSession } from '../lib/supabase';

export class PersonnelService {
  // Officer management
  async createOfficer(uniqueId: string, name: string): Promise<Officer> {
    const { data, error } = await supabase
      .from('officers')
      .insert({ unique_id: uniqueId, name })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getOfficer(id: string): Promise<Officer | null> {
    const { data, error } = await supabase
      .from('officers')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getOfficerByUniqueId(uniqueId: string): Promise<Officer | null> {
    const { data, error } = await supabase
      .from('officers')
      .select('*')
      .eq('unique_id', uniqueId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getAllOfficers(): Promise<Officer[]> {
    const { data, error } = await supabase
      .from('officers')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  // Detainee management
  async createDetainee(
    uniqueId: string, 
    name: string, 
    countryOfCitizenship: string
  ): Promise<Detainee> {
    const { data, error } = await supabase
      .from('detainees')
      .insert({ 
        unique_id: uniqueId, 
        name, 
        country_of_citizenship: countryOfCitizenship 
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getDetainee(id: string): Promise<Detainee | null> {
    const { data, error } = await supabase
      .from('detainees')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getDetaineeByUniqueId(uniqueId: string): Promise<Detainee | null> {
    const { data, error } = await supabase
      .from('detainees')
      .select('*')
      .eq('unique_id', uniqueId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getAllDetainees(): Promise<Detainee[]> {
    const { data, error } = await supabase
      .from('detainees')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  // Intake session management
  async createIntakeSession(
    officerId: string,
    detaineeId: string,
    location?: string
  ): Promise<IntakeSession> {
    const { data, error } = await supabase
      .from('intake_sessions')
      .insert({
        officer_id: officerId,
        detainee_id: detaineeId,
        location,
        status: 'in_progress'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateIntakeSession(
    sessionId: string,
    updates: Partial<IntakeSession>
  ): Promise<IntakeSession> {
    const { data, error } = await supabase
      .from('intake_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async completeIntakeSession(sessionId: string, notes?: string): Promise<IntakeSession> {
    return this.updateIntakeSession(sessionId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      notes
    });
  }

  async getIntakeSession(sessionId: string): Promise<IntakeSession | null> {
    const { data, error } = await supabase
      .from('intake_sessions')
      .select(`
        *,
        officers(id, unique_id, name),
        detainees(id, unique_id, name, country_of_citizenship)
      `)
      .eq('id', sessionId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getActiveIntakeSessions(): Promise<IntakeSession[]> {
    const { data, error } = await supabase
      .from('intake_sessions')
      .select(`
        *,
        officers(id, unique_id, name),
        detainees(id, unique_id, name, country_of_citizenship)
      `)
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const personnelService = new PersonnelService();