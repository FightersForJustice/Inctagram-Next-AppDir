'use client';

import { useTranslations } from 'next-intl';
import { Confirm } from './Confirm';

const RegistrationConfirmation = ({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  const t = useTranslations('RegistrationConfirmationPage');
  return <Confirm code={String(searchParams.code)} translate={t} />;
};

export default RegistrationConfirmation;
