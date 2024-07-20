import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import styles from './BaseLayout.module.scss';
import { GoTopButton } from '@/components/GoTopButton/GoTopButton';

type Props = {
  title?: string;
  children: ReactNode;
  isPublicInfo?: boolean;
};

export const BaseLayout = ({ children, isPublicInfo }: Props) => {
  return (
    <div>
      <Header isAuth={false} isPublicInfo={isPublicInfo} />
      <main className={styles.contentContainer}>
        <div className={styles.content}>{children}</div>
      </main>
      <GoTopButton />
    </div>
  );
};
