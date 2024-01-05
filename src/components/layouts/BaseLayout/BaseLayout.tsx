'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { useAppSelector } from '@/redux/hooks/useSelect';

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  const auth = useAppSelector((state) => state.auth.isAuth);
  return (
    <div>
      <Header isAuth={auth} />
      {children}
    </div>
  );
};
