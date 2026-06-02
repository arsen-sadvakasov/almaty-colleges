import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Портал колледжей Алматинской области",
  description: "Единый портал для абитуриентов Алматинской области",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-neutral-900 bg-neutral-50 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
