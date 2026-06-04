import { ShieldAlert, Info, Award } from "lucide-react";
import { useTranslations } from 'next-intl';

export function AdmissionRules() {
  const t = useTranslations('AdmissionRules');

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm h-full transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="w-6 h-6 text-warning" />
        <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">{t('title')}</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">{t('grade9Title')}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('grade9Desc')}</p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">{t('grade11Title')}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('grade11Desc')}</p>
        </div>
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-900/30 mt-6 flex gap-3 items-start transition-colors">
          <Info className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-primary-800 dark:text-primary-300">
            {t('specialExams')}
          </p>
        </div>
      </div>
    </div>
  );
}

export function GrantsInfo() {
  const t = useTranslations('GrantsInfo');

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm h-full flex flex-col justify-between relative overflow-hidden transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-[100px] -z-10" />
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-success" />
          <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">{t('title')}</h2>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {t('description')}
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">{t('quotaMultiChildren')}</span>
            <span className="font-bold text-success">{t('quotaValue', { value: 5 })}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">{t('quotaRural')}</span>
            <span className="font-bold text-success">{t('quotaValue', { value: 30 })}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">{t('quotaOrphans')}</span>
            <span className="font-bold text-success">{t('quotaValue', { value: 1 })}</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-success/10 dark:bg-success/20 rounded-xl text-success-800 dark:text-success-400 text-sm font-medium border border-success/20 dark:border-success/30 transition-colors">
        {t('stipendInfo')}
      </div>
    </div>
  );
}
