import { MonitorPlay, Stethoscope, BookOpen, HardHat, Briefcase, Calculator } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function SpecialtyCategories() {
  const t = useTranslations('SpecialtyCategories');

  const CATEGORIES = [
    { icon: MonitorPlay, name: t('cat1'), count: 12 },
    { icon: Stethoscope, name: t('cat2'), count: 5 },
    { icon: BookOpen, name: t('cat3'), count: 8 },
    { icon: HardHat, name: t('cat4'), count: 10 },
    { id: 'cat1', icon: MonitorPlay, count: 12 },
    { id: 'cat2', icon: Stethoscope, count: 5 },
    { id: 'cat3', icon: BookOpen, count: 8 },
    { id: 'cat4', icon: HardHat, count: 10 },
    { id: 'cat5', icon: Briefcase, count: 15 },
    { id: 'cat6', icon: Calculator, count: 14 },
  ];

  return (
    <section className="py-24 bg-white dark:bg-neutral-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-4">{t('title')}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, idx) => (
            <Link 
              key={category.id} 
              href={`/specialties?category=${category.id}`}
              className="group bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 hover:bg-primary-900 dark:hover:bg-primary-950 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-neutral-900 flex items-center justify-center text-primary-500 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-6 mb-2 group-hover:text-white transition-colors">{t(`categories.${category.id}.name`)}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 group-hover:text-primary-100 transition-colors">{category.count} {t('specialtiesCount')}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/specialties" className="inline-flex items-center justify-center px-8 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
