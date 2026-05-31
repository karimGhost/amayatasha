import { supabase } from './supabase';
import type { Artwork, ArtworkFormData } from '../types';

export async function fetchArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as Artwork[]) || [];
}

export async function fetchArtworkById(id: string): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as Artwork | null;
}

export async function createArtwork(artwork: ArtworkFormData): Promise<Artwork> {
  const { data, error } = await supabase
    .from('artworks')
    .insert(artwork as any)
    .select()
    .single();

  if (error) throw error;
  return data as Artwork;
}

export async function updateArtwork(id: string, artwork: Partial<ArtworkFormData>): Promise<Artwork> {
  const { data, error } = await supabase
    .from('artworks')
    .update({ ...artwork, updated_at: new Date().toISOString() } as any)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Artwork;
}

export async function deleteArtwork(id: string): Promise<void> {
  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
