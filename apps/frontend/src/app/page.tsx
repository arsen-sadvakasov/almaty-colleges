import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/home/HeroSection";
import { PopularColleges } from "@/components/features/home/PopularColleges";
import { SpecialtyCategories } from "@/components/features/home/SpecialtyCategories";
import { NewsSection } from "@/components/features/home/NewsSection";
import { FAQSection, ContactSection } from "@/components/features/home/FAQAndContact";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const [collegesData, newsList] = await Promise.all([
    prisma.college.findMany({
      take: 3,
      orderBy: { rating: 'desc' },
      include: { specialties: true }
    }),
    prisma.news.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const colleges = collegesData.map(c => ({
    ...c,
    specialties: c.specialties.map(s => s.name),
    contacts: {
      phone: c.phone || undefined,
      email: c.email || undefined,
      address: c.address || undefined,
      website: c.website || undefined,
      instagram: c.instagram || undefined,
    }
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularColleges colleges={colleges} />
        <SpecialtyCategories />
        <NewsSection newsList={newsList} />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
