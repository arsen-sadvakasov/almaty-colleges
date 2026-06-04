import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" });

import { getTranslations } from 'next-intl/server';
import { Preloader } from '@/components/layout/Preloader';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: ["колледжи", "поступление", "гранты", "Алматинская область", "специальности", "абитуриентам"],
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: "https://almaty-colleges.kz",
      siteName: "Алматы Колледждері",
      locale: locale === 'kk' ? "kk_KZ" : "ru_RU",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;

  // Получаем переводы для текущего языка
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-neutral-900 bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-50 flex flex-col min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Preloader />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
