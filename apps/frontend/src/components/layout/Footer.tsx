import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary-900 text-neutral-200 py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Almaty Colleges Logo" className="h-10 w-auto object-contain bg-white rounded-lg p-1" />
            <span className="font-serif font-bold text-lg text-white tracking-tight">
              Almaty Colleges
            </span>
          </Link>
          <p className="text-sm text-neutral-400 max-w-sm">
            Единый образовательный портал Алматинской области. Помогаем абитуриентам сделать правильный выбор.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-white mb-4">Навигация</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/colleges" className="hover:text-white transition-colors">Каталог колледжей</Link></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Специальности</Link></li>
            <li><Link href="/applicant" className="hover:text-white transition-colors">Абитуриенту</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-white mb-4">Контакты</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>Email: info@almaty-colleges.kz</li>
            <li>Телефон: +7 (700) 000-00-00</li>
            <li>г. Конаев, ул. Индустриальная 1</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-700/50 text-sm text-neutral-500 flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Портал колледжей Алматинской области. Все права защищены.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
