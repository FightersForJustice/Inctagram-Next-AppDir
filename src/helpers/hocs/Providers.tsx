'use client';

import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';

import { store } from '../../redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { notFound } from 'next/navigation';

function Providers({ children }: { children: React.ReactNode }) {
  //hardcode locale
  const locale = 'ru';

  let messages;
  try {
    messages = import(`../../../locales/${locale}.json`);
  } catch (error) {
    notFound();
  }

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    >
      <NextIntlClientProvider locale={locale}>
        <Provider store={store}>{children}</Provider>
      </NextIntlClientProvider>
    </GoogleOAuthProvider>
  );
}
export default Providers;
