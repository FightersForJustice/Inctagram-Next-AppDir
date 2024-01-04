import { ReactNode } from 'react';
import Providers from '@/helpers/hocs/Providers';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {

  return (
    <html lang={params.lang}>
      <body>
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
        <Providers>
          <div className={clsx(inter.className)}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
