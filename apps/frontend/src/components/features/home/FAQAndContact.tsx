import { Phone, Mail, MapPin } from "lucide-react";

export function FAQSection() {
  const faqs = [
    { q: "Какие документы нужны для поступления?", a: "Базовый пакет включает: удостоверение личности (или свидетельство о рождении), аттестат об окончании 9/11 класса, медицинскую справку 075-У, 4 фото 3х4." },
    { q: "Как рассчитывается средний балл (GPA) для гранта?", a: "Средний балл рассчитывается на основе оценок по профильным предметам и среднего балла аттестата. Вы можете использовать наш GPA-калькулятор." },
    { q: "Можно ли подать документы онлайн?", a: "Да, большинство колледжей принимает документы через портал eGov.kz." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-12 text-center">Частые вопросы</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-2xl p-6 hover:border-primary-200 transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{faq.q}</h3>
              <p className="text-neutral-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="py-24 bg-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Остались вопросы?</h2>
            <p className="text-primary-100 text-lg mb-10 text-balance">
              Напишите нам, и наш консультант свяжется с вами, чтобы помочь с выбором колледжа или процедурой поступления.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-primary-200 mb-1">Горячая линия</div>
                  <div className="font-medium text-lg">+7 (700) 000-00-00</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-primary-200 mb-1">Email</div>
                  <div className="font-medium text-lg">info@almaty-colleges.kz</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-10 text-neutral-900 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6">Связаться с нами</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <input type="text" className="w-full border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Номер телефона</label>
                <input type="tel" className="w-full border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="+7 (___) ___-__-__" />
              </div>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-xl transition-colors mt-2">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
