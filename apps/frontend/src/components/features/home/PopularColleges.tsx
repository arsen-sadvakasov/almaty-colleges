import { Building2, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { College } from "@/types";
import { useTranslations } from 'next-intl';

interface PopularCollegesProps {
  colleges: College[];
}

export function PopularColleges({ colleges }: PopularCollegesProps) {
  const t = useTranslations('PopularColleges');

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-4">{t('title')}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg">{t('subtitle')}</p>
          </div>
          <Link href="/colleges" className="hidden sm:flex items-center gap-2 text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600 dark:hover:text-primary-300 transition-colors">
            {t('viewAll')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <Link 
              key={college.id} 
              href={`/colleges/${college.id}`}
              className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                {college.imageUrl ? (
                  <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-primary-900/10 dark:bg-primary-500/10 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-primary-900/20" />
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 w-fit px-2.5 py-1 rounded-md mb-4">
                  {college.isState ? t('state') : t('private')}
                </div>
                <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {college.name}
                </h3>
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-6 mt-auto">
                  <MapPin className="w-4 h-4" />
                  <span>{college.city}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <Users className="w-4 h-4" />
                    <span>{college.studentsCount || t('noData')} {t('students')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
