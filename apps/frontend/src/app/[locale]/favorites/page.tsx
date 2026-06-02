import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FavoritesView } from "@/components/features/favorites/FavoritesView";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Избранное | Портал колледжей Алматинской области",
  description: "Сохраненные колледжи и специальности.",
};

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50 pb-20">
        
        {/* Page Header */}
        <div className="bg-primary-900 py-16 text-white mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold">Избранное</h1>
            </div>
            <p className="text-primary-100 max-w-2xl text-lg">
              Ваши сохраненные учебные заведения и специальности для быстрого доступа.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FavoritesView />
        </div>

      </main>
      <Footer />
    </>
  );
}
