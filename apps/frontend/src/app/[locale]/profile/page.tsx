import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: `${t('profileTitle')} | Портал колледжей Алматинской области`,
  };
}

export default async function ProfilePage() {
  const session = await auth();
  const t = await getTranslations('Auth');

  if (!session?.user) {
    redirect("/login");
  }

  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors">
            {/* Header / Cover */}
            <div className="h-32 bg-primary-900 dark:bg-neutral-800 relative transition-colors"></div>
            
            <div className="px-8 pb-8 relative">
              <div className="flex justify-between items-end -mt-12 mb-6">
                <div className="relative">
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || ""} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-900 shadow-md bg-white dark:bg-neutral-800"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-4xl border-4 border-white dark:border-neutral-900 shadow-md">
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <form action={handleLogout}>
                  <button type="submit" className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl transition-colors text-sm">
                    {t('logout')}
                  </button>
                </form>
              </div>

              <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">{session.user.name}</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">{t('iin')}</span>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium mt-1">{(session.user as any).iin || t('notSpecified')}</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">{t('contacts')}</span>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium mt-1">{session.user.email || t('notSpecified')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-8 transition-colors">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6">{t('myFavorites')}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-center py-12">{t('noFavorites')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
