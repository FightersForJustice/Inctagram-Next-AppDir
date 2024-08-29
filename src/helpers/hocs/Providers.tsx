'use client';

import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';
import { Provider } from 'react-redux';
import { store } from '@/redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode, useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const BASE_API = 'https://inctagram.work/api/v1/graphql';

const httpLink = createHttpLink({
  uri: BASE_API,
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('corn');
  if (token && token === 'YWRtaW4=-/-YWRtaW5AZ21haWwuY29t') {
    return {
      headers: {
        ...headers,
        authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_GQL_URL || "")}`,
      },
    };
  }
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// graphql

function Providers({ children, lang }: { children: ReactNode; lang: string }) {
  i18n.use(initReactI18next).init({
    detection: {
      order: ['cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    lng: lang,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });
  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);
  // useEffect(() => {
  //     const fetchMessages = async () => {
  //         try {
  //             const moduleImport = await import(`../../../locales/${locale}.json`);
  //             setMessages(moduleImport);
  //         } catch (error) {
  //             setError(true);
  //         }
  //     };
  //
  //     fetchMessages();
  // }, [locale]);
  //
  // if (error) {
  //     notFound();
  //     return null;
  // }
  //
  // if (!messages) {
  //     return null;
  // }
  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>{children}</Provider>
        </I18nextProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}

export default Providers;
