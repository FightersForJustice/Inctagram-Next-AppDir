import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import styles from './BaseLayout.module.scss';

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <Header isAuth={false} />
      <main className={styles.contentContainer}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};
