import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { Calendar, ArrowRight } from "lucide-react";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export const revalidate = 60;

export default async function NewsPage({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  
  const newsList = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 dark:bg-neutral-950 pb-20 transition-colors">
        
        <div className="bg-primary-900 dark:bg-neutral-900 py-16 text-white mb-12 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{t('title')}</h1>
            <p className="text-primary-100 dark:text-neutral-400 max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <Link 
                key={news.id} 
                href={`/news/${news.id}`}
                className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
              >
                <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                  {news.imageUrl && (
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  {!news.imageUrl && (
                    <div className="absolute inset-0 bg-primary-900/5 group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                    <span className="text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded">{news.category}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary-500 dark:text-primary-400">
                    {t('readMore')} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
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
