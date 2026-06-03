import { Search, User } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '../features/i18n/LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { auth } from "@/auth";

export async function Header() {
  const t = await getTranslations('Header');
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Almaty Colleges Logo" className="h-10 w-auto object-contain" />
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
          <Link href="/colleges" className="p-2 text-neutral-500 hover:text-primary-900 transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </Link>
          
          <LanguageSwitcher />

          {session?.user ? (
            <Link href="/profile" className="flex items-center gap-3 hover:bg-neutral-50 px-2 py-1.5 rounded-xl transition-colors group">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || ""} className="w-10 h-10 rounded-full object-cover border border-neutral-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-bold text-neutral-900 leading-none group-hover:text-primary-600 transition-colors">{session.user.name}</span>
                {(session.user as any).iin && (
                  <span className="text-[10px] text-neutral-500 mt-1.5 leading-none">{t('iin')} {(session.user as any).iin}</span>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{t('login')}</span>
              </Link>
              <Link 
                href="/register" 
                className="flex items-center gap-2 bg-primary-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-900/90 transition-colors"
              >
                <span className="hidden sm:inline">{t('register')}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
