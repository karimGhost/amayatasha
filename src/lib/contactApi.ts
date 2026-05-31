import { supabase } from './supabase';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactMessage(formData: ContactFormData): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .insert(formData as any);

  if (error) throw error;
}
