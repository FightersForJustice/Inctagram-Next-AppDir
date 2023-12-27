'use client';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import React from 'react';
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

function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <I18nextProvider i18n={i18n}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <Provider store={store}>{children}</Provider>
      </GoogleOAuthProvider>
    // </I18nextProvider>
  );
}
export default Providers;
