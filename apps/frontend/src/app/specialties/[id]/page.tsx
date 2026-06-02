import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpecialtyProfile } from "@/components/features/specialties/SpecialtyProfile";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Specialty, College } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  
  if (!specialty) return { title: "Специальность не найдена" };
  
  return {
    title: `${specialty.name} | Портал колледжей Алматинской области`,
    description: specialty.description,
  };
}

export const revalidate = 60;

export default async function SpecialtyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbSpecialty = await prisma.specialty.findUnique({
    where: { id },
    include: { colleges: true }
  });

  if (!dbSpecialty) {
    notFound();
  }

  const specialty: Specialty = {
    ...dbSpecialty,
    careerProspects: JSON.parse(dbSpecialty.careerProspects),
    skills: JSON.parse(dbSpecialty.skills),
    profileSubjects: JSON.parse(dbSpecialty.profileSubjects),
    colleges: dbSpecialty.colleges.map(c => c.id)
  };

  const colleges: College[] = dbSpecialty.colleges.map(c => ({
    ...c,
    specialties: [],
    contacts: {
      phone: c.phone || undefined,
      email: c.email || undefined,
      address: c.address || undefined,
      website: c.website || undefined,
      instagram: c.instagram || undefined,
    }
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <SpecialtyProfile specialty={specialty} colleges={colleges} />
      </main>
      <Footer />
    </>
  );
}
