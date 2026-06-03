"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerUser } from "@/app/actions/auth";
import { useTranslations } from 'next-intl';

import { useEffect } from "react";

export function RegisterForm({ children, onSuccess }: { children?: React.ReactNode, onSuccess?: () => void }) {
  const [state, action] = useActionState(registerUser, undefined);
  const t = useTranslations('Auth');

  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form className="mt-8 space-y-5" action={action}>
      {children}
      {state?.success && !onSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
          Регистрация прошла успешно. Вы можете войти.
        </div>
      )}
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {state.error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">{t('nameLabel')}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="iin" className="block text-sm font-medium text-neutral-700">{t('iinLabel')}</label>
          <input
            id="iin"
            name="iin"
            type="text"
            required
            pattern="\d{12}"
            title="ИИН должен состоять из 12 цифр"
            className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('iinPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">{t('emailLabel')}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">{t('phoneLabel')}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
            placeholder={t('phonePlaceholder')}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">{t('passwordLabel')}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
              placeholder={t('passwordPlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">{t('confirmPasswordLabel')}</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
              placeholder={t('confirmPasswordPlaceholder')}
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
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
      className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-primary-900 hover:bg-primary-900/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? t('registerButtonPending') : t('registerButton')}
    </button>
  );
}
