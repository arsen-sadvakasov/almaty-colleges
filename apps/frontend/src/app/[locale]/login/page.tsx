import { Link } from '@/i18n/routing';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "./LoginForm";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: `${t('loginTitle')} | Портал колледжей Алматинской области`,
  };
}

export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-neutral-100">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-neutral-900">
              {t('loginWelcome')}
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              {t('loginSubtitle')}
            </p>
          </div>
          
          <LoginForm />

          <div className="text-center mt-6">
            <p className="text-sm text-neutral-600">
              {t('noAccount')}{' '}
              <Link href="/register" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                {t('registerLink')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
