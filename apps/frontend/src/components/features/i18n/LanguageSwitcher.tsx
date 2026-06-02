"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'ru' ? 'kk' : 'ru';
    
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button 
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-primary-900 transition-colors disabled:opacity-50"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline uppercase">{locale === 'ru' ? 'KK' : 'RU'}</span>
    </button>
  );
}
