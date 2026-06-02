import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollegeProfile } from "@/components/features/colleges/CollegeProfile";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { College } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await prisma.college.findUnique({ where: { id } });
  
  if (!college) return { title: "Колледж не найден" };
  
  return {
    title: `${college.name} | Портал колледжей Алматинской области`,
    description: college.description || `Информация о ${college.name}`,
  };
}

export const revalidate = 60;

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbCollege = await prisma.college.findUnique({
    where: { id },
    include: { specialties: true }
  });

  if (!dbCollege) {
    notFound();
  }

  // Приводим данные БД к типу, который ожидает компонент
  const college: College = {
    ...dbCollege,
    specialties: dbCollege.specialties.map(s => s.name),
    contacts: {
      phone: dbCollege.phone || undefined,
      email: dbCollege.email || undefined,
      address: dbCollege.address || undefined,
      website: dbCollege.website || undefined,
      instagram: dbCollege.instagram || undefined,
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <CollegeProfile college={college} />
      </main>
      <Footer />
    </>
  );
}
