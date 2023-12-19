import { ReactNode } from 'react';
import Providers from '@/helpers/hocs/Providers';

import './globals.css';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
