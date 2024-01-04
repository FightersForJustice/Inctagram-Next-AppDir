import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { BaseLayout } from '@/components/layouts/BaseLayout';

import '../globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children }: Props) {
  //hardcode locale
  const locale = 'ru';

  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <div className="h-full" lang={locale}>
      <div className={clsx(inter.className, 'flex h-full flex-col')}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BaseLayout>{children}</BaseLayout>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
