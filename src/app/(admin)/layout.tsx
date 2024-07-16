import { AuthorizedLayout } from '@/components/layouts/AuthorizedLayout/AuthorizedLayout';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return <AuthorizedLayout admin>{children}</AuthorizedLayout>;
}
