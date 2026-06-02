import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AiConsultant } from "@/components/features/chat/AiConsultant";
import { Sparkles } from "lucide-react";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ChatPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ChatPage({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ChatPage' });

  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 pb-20">
        
        {/* Page Header */}
        <div className="bg-primary-900 py-16 text-white mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold">{t('title')}</h1>
            </div>
            <p className="text-primary-100 max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AiConsultant />
        </div>

      </main>
      <Footer />
    </>
  );
}
