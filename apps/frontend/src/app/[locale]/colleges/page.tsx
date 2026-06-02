import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollegesList } from "@/components/features/colleges/CollegesList";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Каталог колледжей | Портал колледжей Алматинской области",
  description: "Поиск и сравнение колледжей Алматинской области",
};

export const revalidate = 60; // кэширование на 60 секунд

export default async function CollegesPage() {
  const collegesData = await prisma.college.findMany({
    include: { specialties: true },
    orderBy: { rating: 'desc' }
  });
  
  const colleges = collegesData.map(c => ({
    ...c,
    specialties: c.specialties.map(s => s.name)
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-primary-900 py-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Каталог колледжей</h1>
            <p className="text-primary-100 max-w-2xl text-lg">
              Используйте фильтры для поиска подходящего учебного заведения по городу, специальности или наличию общежития.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CollegesList colleges={colleges} />
        </div>
      </main>
      <Footer />
    </>
  );
}
