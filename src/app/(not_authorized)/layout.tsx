import { ReactNode } from 'react';
import { BaseLayout } from '@/components/layouts/BaseLayout';

import '../globals.scss';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
