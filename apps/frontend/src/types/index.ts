export interface College {
  id: string;
  name: string;
  city: string;
  isState: boolean;
  hasDormitory: boolean;
  hasGrants: boolean;
  specialties: string[];
  studentsCount: number;
  rating: number;
  imageUrl?: string;
}
