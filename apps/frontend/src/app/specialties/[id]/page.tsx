import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpecialtyProfile } from "@/components/features/specialties/SpecialtyProfile";
import { MOCK_SPECIALTIES, MOCK_COLLEGES } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const specialty = MOCK_SPECIALTIES.find(s => s.id === id);
  
  if (!specialty) return { title: "Специальность не найдена" };
  
  return {
    title: `${specialty.name} | Портал колледжей Алматинской области`,
    description: specialty.description,
  };
}

export function generateStaticParams() {
  return MOCK_SPECIALTIES.map((specialty) => ({
    id: specialty.id,
  }));
}

export default async function SpecialtyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const specialty = MOCK_SPECIALTIES.find(s => s.id === id);

  if (!specialty) {
    notFound();
  }

  const colleges = MOCK_COLLEGES.filter(c => specialty.colleges.includes(c.id));

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
