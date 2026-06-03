import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuth = !!req.auth;
  const isOnboardingComplete = req.cookies.get('onboarding_complete')?.value === 'true' || isAuth;
  
  const pathname = req.nextUrl.pathname;
  const isApiRoute = pathname.startsWith('/api');
  const isOnboardingPath = pathname.endsWith('/onboarding');
  
  if (!isOnboardingComplete && !isOnboardingPath && !isApiRoute) {
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    let targetUrl;
    if (pathnameHasLocale) {
      const locale = pathname.split('/')[1];
      targetUrl = new URL(`/${locale}/onboarding`, req.url);
    } else {
      targetUrl = new URL(`/${defaultLocale}/onboarding`, req.url);
    }
    
    return NextResponse.redirect(targetUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
