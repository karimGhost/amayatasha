export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: Category;
  image_urls: string[];
  story: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export type Category = 'Arts' | 'Graphic Designs' | 'Digital Art' | 'Paintings';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface ArtworkFormData {
  title: string;
  description: string;
  category: Category;
  image_urls: string[];
  story: string;
  tags: string[];
}

export interface ArtistInfo {
  name: string;
  title: string;
  bio: string;
  journey: string;
  style: string;
  inspiration: string;
  skills: string[];
  profileImage: string;
  email: string;
  phone: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  whatsapp?: string;
}
