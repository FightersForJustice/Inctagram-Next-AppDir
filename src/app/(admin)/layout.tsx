import { AuthorizedLayout } from '@/components/layouts/AuthorizedLayout/AuthorizedLayout';
import { ReactNode } from 'react';
import s from './AdminProfile.module.scss'

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <AuthorizedLayout admin>
      <div className={s.container}>{children}</div>
    </AuthorizedLayout>
  );
}
