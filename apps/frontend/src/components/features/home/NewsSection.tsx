import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar } from "lucide-react";
import { News } from "@/types";
import { useTranslations } from 'next-intl';

interface NewsSectionProps {
  newsList: News[];
}

export function NewsSection({ newsList }: NewsSectionProps) {
  const t = useTranslations('NewsSection');

  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">{t('title')}</h2>
            <p className="text-neutral-500 max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <Link 
              key={news.id} 
              href={`/news/${news.id}`}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="h-48 bg-neutral-200 relative overflow-hidden">
                {news.imageUrl ? (
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-primary-900/5 group-hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                  <span className="text-primary-500 bg-primary-50 px-2 py-1 rounded">{news.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {news.date}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl text-neutral-900 mb-4 group-hover:text-primary-500 transition-colors line-clamp-3">
                  {news.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary-500">
                  {t('readMore')} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/news" className="inline-flex items-center justify-center px-8 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
