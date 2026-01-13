// Datamodeller för reseappen

export type City = 'las-vegas' | 'los-angeles';

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'restaurant' | 'entertainment' | 'nature' | 'museum' | 'shopping' | 'other';
  city: City;
  address?: string;
  rating?: number;
  visited?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Checklist {
  id: string;
  title: string;
  description?: string;
  city?: City;
  items: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: 'passport' | 'ticket' | 'booking' | 'insurance' | 'other';
  description?: string;
  familyMember?: string;
  uploadedAt: Date;
  fileUrl?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role?: string;
}
