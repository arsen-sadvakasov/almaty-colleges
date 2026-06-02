import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from './i18n/routing';

export const locales = ['ru', 'kk'] as const;
export const defaultLocale = 'ru';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  console.log("getRequestConfig locale:", locale);
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
