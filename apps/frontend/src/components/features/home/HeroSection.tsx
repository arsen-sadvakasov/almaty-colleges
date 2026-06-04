import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section className="relative overflow-hidden text-white pt-24 pb-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      />
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-primary-900/80 dark:bg-neutral-950/80 backdrop-blur-[2px] transition-colors" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 text-balance">
          {t('subtitle')}
        </p>
        
        {/* Search Bar */}
        <form action="/colleges" className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl p-2 shadow-lg flex items-center focus-within:ring-2 focus-within:ring-primary-500 transition-all">
          <div className="pl-4 text-neutral-400">
            <Search className="w-6 h-6" />
          </div>
          <input 
            type="text" 
            name="q"
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent border-none px-6 py-3 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          />
          <button type="submit" className="bg-primary-500 hover:bg-primary-500/90 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            {t('searchButton')}
          </button>
        </form>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-primary-100 font-medium">
          <span>{t('frequentSearches')}</span>
          <button className="hover:text-white underline underline-offset-4">{t('query1')}</button>
          <button className="hover:text-white underline underline-offset-4">{t('query2')}</button>
          <button className="hover:text-white underline underline-offset-4">{t('query3')}</button>
        </div>
      </div>
    </section>
  );
}
