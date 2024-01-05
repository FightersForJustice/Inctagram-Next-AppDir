'use client';
import { RegistrationEmailResend } from '@/components/auth';
import { useTranslation } from 'react-i18next';

const EmailExpired = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`EmailExpiredPage.${key}`);
  return <RegistrationEmailResend translate={translate} />;
};

export default EmailExpired;
