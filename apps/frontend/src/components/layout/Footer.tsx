import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-primary-900 text-neutral-200 py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Almaty Colleges Logo" className="h-10 w-auto object-contain bg-white rounded-lg p-1" />
            <span className="font-serif font-bold text-lg text-white tracking-tight">
              Almaty Colleges
            </span>
          </Link>
          <p className="text-sm text-neutral-400 max-w-sm">
            {t('description')}
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-white mb-4">{t('navigation')}</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/colleges" className="hover:text-white transition-colors">{t('colleges')}</Link></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">{t('specialties')}</Link></li>
            <li><Link href="/applicant" className="hover:text-white transition-colors">{t('applicant')}</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">{t('faq')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-white mb-4">{t('contacts')}</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>{t('email')}: info@almaty-colleges.kz</li>
            <li>{t('phone')}: +7 (700) 000-00-00</li>
            <li>{t('address')}</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-700/50 text-sm text-neutral-500 flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} {t('rights')}</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/" className="hover:text-white transition-colors">{t('privacy')}</Link>
        </div>
      </div>
    </footer>
  );
}
