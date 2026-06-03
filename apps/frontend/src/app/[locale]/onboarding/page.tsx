import { getTranslations } from 'next-intl/server';
import { OnboardingClient } from './OnboardingClient';

export default async function OnboardingPage({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Onboarding' });
  
  return <OnboardingClient />;
}
