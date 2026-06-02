import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Специальности | Портал колледжей Алматинской области",
  description: "Каталог специальностей и профессий для поступления в колледжи",
};

export const revalidate = 60;

export default async function SpecialtiesPage() {
  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-primary-900 py-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Специальности</h1>
            <p className="text-primary-100 max-w-2xl text-lg">
              Изучите доступные направления обучения, узнайте о перспективах трудоустройства и выберите будущую профессию.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Link 
                key={specialty.id} 
                href={`/specialties/${specialty.id}`}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-50 p-3 rounded-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                    Код: {specialty.code}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {specialty.name}
                </h3>
                
                <p className="text-sm text-neutral-500 line-clamp-3 mb-6 flex-grow">
                  {specialty.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <GraduationCap className="w-4 h-4 text-primary-500" />
                    <span className="truncate max-w-[200px]">{specialty.qualification}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary-500 transition-colors group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
