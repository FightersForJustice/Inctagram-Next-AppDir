'use client';
import { Confirm } from '@/components/auth';
import { useTranslation } from 'react-i18next';

const RegistrationConfirmation = ({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`RegistrationConfirmationPage.${key}`);

  return <Confirm code={String(searchParams.code)} translate={translate} />;
};

export default RegistrationConfirmation;
