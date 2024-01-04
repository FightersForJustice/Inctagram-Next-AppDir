import { ReactNode } from 'react';

import { AuthorizedLayout } from '@/components/layouts/AuthorizedLayout/AuthorizedLayout';

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
