import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/home/HeroSection";
import { PopularColleges } from "@/components/features/home/PopularColleges";
import { SpecialtyCategories } from "@/components/features/home/SpecialtyCategories";
import { NewsSection } from "@/components/features/home/NewsSection";
import { FAQSection, ContactSection } from "@/components/features/home/FAQAndContact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularColleges />
        <SpecialtyCategories />
        <NewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
