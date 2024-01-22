'use client';

import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';
import { Provider } from 'react-redux';
import { store } from '@/redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode, useEffect } from 'react';

i18n.use(initReactI18next).init({
  detection: {
    order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage', 'cookie'],
  },
  lng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});

function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    >
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>{children}</Provider>
      </I18nextProvider>
    </GoogleOAuthProvider>
  );
}

export default Providers;
