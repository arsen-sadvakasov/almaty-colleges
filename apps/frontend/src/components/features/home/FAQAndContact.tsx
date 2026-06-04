import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from 'next-intl';

export function FAQSection() {
  const t = useTranslations('FAQ');

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') }
  ];

  return (
    <section className="py-24 bg-white dark:bg-neutral-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-12 text-center">{t('title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/50 rounded-2xl p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">{faq.q}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section className="py-24 bg-primary-900 text-white transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">{t('title')}</h2>
            <p className="text-primary-100 text-lg mb-10 text-balance">
              {t('subtitle')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-primary-200 mb-1">{t('hotline')}</div>
                  <div className="font-medium text-lg">+7 (700) 000-00-00</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-primary-200 mb-1">{t('emailLabel')}</div>
                  <div className="font-medium text-lg">info@almaty-colleges.kz</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-10 text-neutral-900 dark:text-neutral-100 shadow-2xl transition-colors">
            <h3 className="text-2xl font-serif font-bold mb-6">{t('formTitle')}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-neutral-300">{t('nameLabel')}</label>
                <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors" placeholder={t('namePlaceholder')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-neutral-300">{t('phoneLabel')}</label>
                <input type="tel" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors" placeholder="+7 (___) ___-__-__" />
              </div>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-xl transition-colors mt-2">
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
