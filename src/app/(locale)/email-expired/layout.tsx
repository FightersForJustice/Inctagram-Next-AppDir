import { ReactNode } from 'react';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Email expired',
  description: 'Email verification link expired',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
