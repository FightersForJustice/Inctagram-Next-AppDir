import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email confirmed',
  description: 'Your email has been confirmed',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
