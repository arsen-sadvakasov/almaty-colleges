"use client";

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'ru' ? 'kk' : 'ru';

  return (
    <Link 
      href={pathname}
      locale={nextLocale}
      className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-primary-900 transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline uppercase">{nextLocale}</span>
    </Link>
  );
}
