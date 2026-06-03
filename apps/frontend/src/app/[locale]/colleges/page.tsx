import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollegesList } from "@/components/features/colleges/CollegesList";
import { prisma } from "@/lib/prisma";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CollegesPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export const revalidate = 60; // кэширование на 60 секунд

export default async function CollegesPage({ 
  params,
  searchParams
}: { 
  params: Promise<{locale: string}>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'CollegesPage' });

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
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('title')}</h1>
            <p className="text-primary-100 max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CollegesList colleges={colleges} initialSearch={q} />
        </div>
      </main>
      <Footer />
    </>
  );
}
