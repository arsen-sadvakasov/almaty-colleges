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
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-4">{t('title')}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg">{t('subtitle')}</p>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-2 text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600 dark:hover:text-primary-300 transition-colors">
            {t('viewAll')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <Link 
              key={news.id} 
              href={`/news/${news.id}`}
              className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                {news.imageUrl ? (
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-primary-900/5 dark:bg-primary-500/10 group-hover:scale-105 transition-transform duration-500" />
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
                <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary-500 dark:text-primary-400">
                  {t('readMore')} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 sm:hidden text-center">
          <Link href="/news" className="inline-flex items-center justify-center px-8 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
