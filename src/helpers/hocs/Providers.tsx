'use client';

import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { notFound } from 'next/navigation';


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
async function Providers({ children }: { children: React.ReactNode }) {
  //hardcode locale
  const locale = 'ru';

  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

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
