import { Search, User } from "lucide-react";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../features/i18n/LanguageSwitcher';
import { Link } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-900 rounded flex items-center justify-center text-white font-serif font-bold">
              C
            </div>
            <span className="font-serif font-bold text-lg text-primary-900 tracking-tight hidden sm:block">
              Almaty Colleges
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
            <Link href="/colleges" className="hover:text-primary-900 transition-colors">{t('colleges')}</Link>
            <Link href="/specialties" className="hover:text-primary-900 transition-colors">{t('specialties')}</Link>
            <Link href="/applicant" className="hover:text-primary-900 transition-colors">{t('applicant')}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-neutral-500 hover:text-primary-900 transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          
          <LanguageSwitcher />

          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-primary-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-900/90 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{t('login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
