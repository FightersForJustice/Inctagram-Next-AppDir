import { ReactNode } from 'react';
import Providers from '@/helpers/hocs/Providers';

import './globals.scss';
import { ToastContainer } from 'react-toastify';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
