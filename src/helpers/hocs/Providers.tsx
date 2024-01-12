'use client';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';

import { store } from '../../redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { notFound } from 'next/navigation';

function Providers({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any>(null);
  const [error, setError] = useState(false);

  // Hardcode locale
  const locale = 'en';

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const module = await import(`../../../locales/${locale}.json`);
        setMessages(module);
      } catch (error) {
        setError(true);
      }
    };

    fetchMessages();
  }, [locale]);

  if (error) {
    notFound();
    return null;
  }

  if (!messages) {
    return null;
  }

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Provider store={store}>{children}</Provider>
      </NextIntlClientProvider>
    </GoogleOAuthProvider>
  );
}

export default Providers;
