import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
