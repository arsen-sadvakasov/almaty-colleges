import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareView } from "@/components/features/compare/CompareView";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Сравнение колледжей | Портал колледжей Алматинской области",
  description: "Сравнение учебных заведений по рейтингу, специальностям, наличию общежитий и грантов.",
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 pb-20">
        
        {/* Page Header */}
        <div className="bg-primary-900 py-16 text-white mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold">Сравнение колледжей</h1>
            </div>
            <p className="text-primary-100 max-w-2xl text-lg">
              Добавьте интересующие вас колледжи в таблицу, чтобы сравнить их и сделать правильный выбор.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CompareView />
        </div>

      </main>
      <Footer />
    </>
  );
}
