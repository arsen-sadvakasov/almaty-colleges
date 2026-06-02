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
  imageUrl?: string | null;
  history?: string | null;
  description?: string | null;
  contacts?: {
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    website?: string | null;
    instagram?: string | null;
  };
  dormitoryInfo?: string | null;
  tuitionFee?: string | null;
  admissionRules?: string | null;
  lastUpdated?: string | null;
  dataSource?: string | null;
  gallery?: string[];
}
export interface Specialty {
  id: string;
  code: string;
  name: string;
  description: string;
  studyDuration: string; // e.g. "2 года 10 месяцев"
  qualification: string;
  careerProspects: string[];
  skills: string[];
  profileSubjects: string[]; // e.g. ["Математика", "Физика"]
  colleges: string[]; // array of college IDs offering this
}

export interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  imageUrl?: string | null;
}
