"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions/auth";
import { useTranslations } from 'next-intl';

export function LoginForm() {
  const [state, action] = useActionState(authenticate, undefined);
  const t = useTranslations('Auth');

  return (
    <form className="mt-8 space-y-6" action={action}>
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {state.error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('identifierLabel')}</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('identifierPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('passwordLabel')}</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('passwordPlaceholder')}
          />
        </div>
      </div>

      <div>
        <SubmitButton t={t} />
      </div>
    </form>
  );
}

function SubmitButton({ t }: { t: any }) {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-primary-900 dark:bg-primary-600 hover:bg-primary-900/90 dark:hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? t('loginButtonPending') : t('loginButton')}
    </button>
  );
}
