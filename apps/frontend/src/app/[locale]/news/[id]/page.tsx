import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsDetailPage' });
  const news = await prisma.news.findUnique({ where: { id } });
  
  if (!news) return { title: t('metaTitleFallback') };
  
  return {
    title: `${news.title}${t('metaTitleSuffix')}`,
    description: news.content.slice(0, 150) + "...",
  };
}

export const revalidate = 60;

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsDetailPage' });
  const news = await prisma.news.findUnique({ where: { id } });

  if (!news) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 pb-20 pt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <Link href="/news" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> {t('backToNews')}
          </Link>

          <article className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="h-64 sm:h-80 md:h-96 bg-neutral-200 relative w-full">
              {news.imageUrl && (
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
              )}
              {!news.imageUrl && (
                <div className="absolute inset-0 bg-primary-900/5 flex items-center justify-center">
                   <span className="text-primary-900/20 font-serif font-bold text-4xl">{t('newsPhoto')}</span>
                </div>
              )}
            </div>
            
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-4 text-sm font-medium text-neutral-500 mb-6">
                <span className="text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{news.category}</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {news.date}
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-8 leading-tight">
                {news.title}
              </h1>
              
              <div className="prose prose-lg prose-neutral max-w-none text-neutral-700 leading-relaxed">
                <p>{news.content}</p>
                <p>
                  {t('dummyParagraph1')}
                </p>
                <p>
                  {t('dummyParagraph2')}
                </p>
              </div>
            </div>
          </article>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
