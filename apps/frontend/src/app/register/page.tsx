import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Регистрация | Портал колледжей Алматинской области",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-neutral-100">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-neutral-900">
              Создать аккаунт
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Присоединяйтесь к порталу колледжей Алматинской области
            </p>
          </div>
          
          <RegisterForm />

          <div className="text-center mt-8 pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-600">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
