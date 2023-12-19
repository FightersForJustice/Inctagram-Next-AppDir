'use client';

import React, { ReactNode } from 'react';
import { BaseLayout } from '@/components/layouts/BaseLayout';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
};

export default RootLayout;
