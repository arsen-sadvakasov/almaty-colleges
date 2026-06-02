import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-primary-900 overflow-hidden text-white pt-24 pb-32">
      {/* Background pattern or subtle gradient can go here */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-900/80 opacity-90" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Открой свое будущее с лучшими колледжами Алматинской области
        </h1>
        <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 text-balance">
          Единая платформа для абитуриентов. Найди подходящую специальность, сравни колледжи и узнай свои шансы на грант.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-lg flex items-center focus-within:ring-2 focus-within:ring-primary-500 transition-shadow">
          <div className="pl-4 text-neutral-400">
            <Search className="w-6 h-6" />
          </div>
          <input 
            type="text" 
            placeholder="Профессия, специальность или название колледжа..." 
            className="w-full bg-transparent border-none outline-none text-neutral-900 px-4 py-3 placeholder:text-neutral-400 text-lg"
          />
          <button className="bg-primary-500 hover:bg-primary-500/90 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            Найти
          </button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-primary-100 font-medium">
          <span>Частые запросы:</span>
          <button className="hover:text-white underline underline-offset-4">IT-технологии</button>
          <button className="hover:text-white underline underline-offset-4">Медицина</button>
          <button className="hover:text-white underline underline-offset-4">Педагогика</button>
        </div>
      </div>
    </section>
  );
}
