'use client';

import { ReactNode } from 'react';
import { useGetAuthMeQuery } from '@/api';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  const { isLoading } = useGetAuthMeQuery();

  if (isLoading) return <Loader />;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
