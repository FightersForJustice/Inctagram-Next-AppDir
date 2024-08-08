import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { ServerSideBar } from '@/components/Navigation/serverSideBar';

import styles from './AuthorizedLayout.module.scss';
import { GoTopButton } from '@/components/GoTopButton/GoTopButton';

type Props = {
  children: ReactNode;
  admin?: boolean;
};

export const AuthorizedLayout = ({ children, admin = false }: Props) => {
  return (
    <div className={styles.layoutContainer}>
      <Header isAuth isAdmin={admin} />
      <main className={styles.contentContainer}>
        <div className={styles.nav}>
          <ServerSideBar paidAccount={false} admin={admin} />
        </div>
        <div className={styles.content}>{children}</div>
        <GoTopButton />
      </main>
    </div>
  );
};
