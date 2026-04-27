'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type LeadData = {
  parent_email: string;
  student_pseudo?: string;
  exam_goal: string;
  current_level: string;
  difficulties: string[];
  source?: string;
  wants_pack?: boolean;
};

export async function saveLead(data: LeadData) {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.log('--- SUPABASE MOCK (Keys not configured) ---');
      console.log('Saving lead:', data);
      console.log('-------------------------------------------');
      return { success: true, mocked: true };
    }

    const { error } = await supabase.from('leads').insert([data]);

    if (error) {
      console.error('Error saving lead to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error saving lead:', error);
    return { success: false, error: 'Internal server error' };
  }
}
