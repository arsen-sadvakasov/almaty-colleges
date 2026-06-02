import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollegeProfile } from "@/components/features/colleges/CollegeProfile";
import { MOCK_COLLEGES } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = MOCK_COLLEGES.find(c => c.id === id);
  
  if (!college) return { title: "Колледж не найден" };
  
  return {
    title: `${college.name} | Портал колледжей Алматинской области`,
    description: college.description || `Информация о ${college.name}`,
  };
}

export function generateStaticParams() {
  return MOCK_COLLEGES.map((college) => ({
    id: college.id,
  }));
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = MOCK_COLLEGES.find(c => c.id === id);

  if (!college) {
    notFound();
  }

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
