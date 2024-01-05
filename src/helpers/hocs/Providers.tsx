'use client';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import React, { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../../../public/locales/en/en.json';
import ru from '../../../public/locales/ru/ru.json';

i18n.use(initReactI18next).init({
  detection: {
    order: ['localStorage', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage'],
  },
  lng: 'ru',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18next');
    console.log(storedLanguage);
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
