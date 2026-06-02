import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Портал колледжей Алматинской области",
  description: "Единый портал для абитуриентов Алматинской области. Каталог колледжей, специальностей, проходных баллов и грантов.",
  keywords: ["колледжи", "поступление", "гранты", "Алматинская область", "специальности", "абитуриентам"],
  openGraph: {
    title: "Портал колледжей Алматинской области",
    description: "Найди свой колледж, специальность и узнай о грантах в Алматинской области.",
    url: "https://almaty-colleges.kz",
    siteName: "Алматы Колледждері",
    locale: "kk_KZ",
    type: "website",
  },
};

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
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-neutral-900 bg-neutral-50 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
