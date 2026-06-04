import { Link } from '@/i18n/routing';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "./RegisterForm";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: `${t('registerTitle')} | Портал колледжей Алматинской области`,
  };
}

export default async function RegisterPage() {
  const t = await getTranslations('Auth');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-2xl w-full bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              {t('registerWelcome')}
            </h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t('registerSubtitle')}
            </p>
          </div>
          
          <RegisterForm />

          <div className="text-center mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('hasAccount')}{' '}
              <Link href="/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                {t('loginLink')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
