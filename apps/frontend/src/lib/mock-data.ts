import { College } from "@/types";

export const MOCK_COLLEGES: College[] = [
  {
    id: "1",
    name: "Талдыкорганский высший политехнический колледж",
    city: "Талдыкорган",
    isState: true,
    hasDormitory: true,
    hasGrants: true,
    specialties: ["IT", "Строительство", "Энергетика"],
    studentsCount: 2450,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Жетысуский гуманитарно-технический колледж",
    city: "Талдыкорган",
    isState: false,
    hasDormitory: true,
    hasGrants: true,
    specialties: ["Педагогика", "Экономика", "IT"],
    studentsCount: 1800,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Каскеленский профессионально-технический колледж",
    city: "Каскелен",
    isState: true,
    hasDormitory: false,
    hasGrants: true,
    specialties: ["Автодело", "Строительство"],
    studentsCount: 1200,
    rating: 4.2,
  },
  {
    id: "4",
    name: "Есикский медицинский колледж",
    city: "Есик",
    isState: false,
    hasDormitory: true,
    hasGrants: false,
    specialties: ["Медицина"],
    studentsCount: 850,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Алматинский областной колледж инновационных технологий",
    city: "Капшагай",
    isState: true,
    hasDormitory: true,
    hasGrants: true,
    specialties: ["IT", "Туризм"],
    studentsCount: 1500,
    rating: 4.7,
  }
];

export const CITIES = ["Талдыкорган", "Каскелен", "Есик", "Капшагай"];
export const SPECIALTIES = ["IT", "Строительство", "Энергетика", "Педагогика", "Экономика", "Автодело", "Медицина", "Туризм"];
