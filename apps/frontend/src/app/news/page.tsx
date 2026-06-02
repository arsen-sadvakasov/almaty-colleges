import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MOCK_NEWS } from "@/lib/mock-data";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Новости | Портал колледжей Алматинской области",
  description: "Последние новости, события и объявления для абитуриентов Алматинской области.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 pb-20">
        
        {/* Page Header */}
        <div className="bg-primary-900 py-16 text-white mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Новости и события</h1>
            <p className="text-primary-100 max-w-2xl text-lg">
              Оставайтесь в курсе последних событий в сфере образования Алматинской области.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_NEWS.map((news) => (
              <Link 
                key={news.id} 
                href={`/news/${news.id}`}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
              >
                <div className="h-48 bg-neutral-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/5 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                    <span className="text-primary-500 bg-primary-50 px-2 py-1 rounded">{news.category}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-neutral-900 mb-4 group-hover:text-primary-500 transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary-500">
                    Читать далее <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
