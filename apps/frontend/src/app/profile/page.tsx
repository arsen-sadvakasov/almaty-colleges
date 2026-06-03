import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Личный кабинет | Портал колледжей Алматинской области",
};

export default async function ProfilePage() {
  const session = await auth();

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
      <main className="flex-1 bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Header / Cover */}
            <div className="h-32 bg-primary-900 relative"></div>
            
            <div className="px-8 pb-8 relative">
              <div className="flex justify-between items-end -mt-12 mb-6">
                <div className="relative">
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || ""} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-4xl border-4 border-white shadow-md">
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <form action={handleLogout}>
                  <button type="submit" className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-xl transition-colors text-sm">
                    Выйти из аккаунта
                  </button>
                </form>
              </div>

              <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900">{session.user.name}</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">ИИН</span>
                    <p className="text-neutral-900 font-medium mt-1">{(session.user as any).iin || "Не указан"}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Email / Контакты</span>
                    <p className="text-neutral-900 font-medium mt-1">{session.user.email || "Не указан"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-neutral-200 p-8">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Моё избранное</h2>
            <p className="text-neutral-500 text-center py-12">У вас пока нет сохраненных колледжей и специальностей.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
