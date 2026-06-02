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
  history?: string;
  description?: string;
  contacts?: {
    phone: string;
    email: string;
    address: string;
    website?: string;
    instagram?: string;
  };
  dormitoryInfo?: string;
  tuitionFee?: string;
  admissionRules?: string;
  lastUpdated?: string;
  dataSource?: string;
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
  imageUrl?: string;
}
