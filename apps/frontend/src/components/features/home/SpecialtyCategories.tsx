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
    { icon: Briefcase, name: t('cat5'), count: 15 },
    { icon: Calculator, name: t('cat6'), count: 14 },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">{t('title')}</h2>
        <p className="text-neutral-500 max-w-2xl mx-auto mb-16 text-lg">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, idx) => (
            <Link 
              key={idx}
              href="/specialties"
              className="flex items-center gap-6 p-6 rounded-2xl border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all group text-left"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <category.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">{category.name}</h3>
                <p className="text-sm text-neutral-500">{t('collegesCount', { count: category.count })}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12">
          <Link href="/specialties" className="inline-flex items-center justify-center px-8 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
