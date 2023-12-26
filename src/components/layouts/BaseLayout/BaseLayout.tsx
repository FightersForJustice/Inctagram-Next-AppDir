import { ReactNode } from 'react';
import { Header } from '@/components/Header';

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
