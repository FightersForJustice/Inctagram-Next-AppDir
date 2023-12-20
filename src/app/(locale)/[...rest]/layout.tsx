import React, { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
};

export default RootLayout;
