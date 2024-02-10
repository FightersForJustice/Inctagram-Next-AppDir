import { ReactNode } from 'react';
import Providers from '@/helpers/hocs/Providers';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = cookies().get('userLanguage')?.value || 'en';

  return (
    <html lang={lang}>
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
        <Providers lang={lang}>
          <div className={clsx(inter.className)}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
