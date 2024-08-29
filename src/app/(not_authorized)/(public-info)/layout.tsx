import { ReactNode } from 'react';
import { BaseLayout } from '@/components/layouts/BaseLayout';

import '@/app/globals.scss';

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return <BaseLayout isPublicInfo>{children}</BaseLayout>;
}
