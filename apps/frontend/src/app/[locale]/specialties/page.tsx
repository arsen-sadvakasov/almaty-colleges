import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SpecialtiesPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export const revalidate = 60;

export default async function SpecialtiesPage({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SpecialtiesPage' });
  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-primary-900 dark:bg-neutral-900 py-12 text-white transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('title')}</h1>
            <p className="text-primary-100 dark:text-neutral-400 max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Link 
                key={specialty.id} 
                href={`/specialties/${specialty.id}`}
                className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl text-primary-500 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                    {t('code', { code: specialty.code })}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {specialty.name}
                </h3>
                
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-6 flex-grow">
                  {specialty.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                    <GraduationCap className="w-4 h-4 text-primary-500 dark:text-primary-400" />
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
