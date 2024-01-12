'use client';

import { Provider } from 'react-redux';
import i18n from 'i18next';
import { store } from '../../redux/store';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { notFound } from 'next/navigation';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';

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

// eslint-disable-next-line @next/next/no-async-client-component
async function Providers({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem('i18next');
  //   console.log(storedLanguage);
  //   if (storedLanguage && storedLanguage !== i18n.language) {
  //     i18n.changeLanguage(storedLanguage);
  //   }
  // }, []);

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
