'use client';

import { useTranslation } from 'react-i18next';
import { RegistrationEmailResend } from '@/components/auth';

const EmailExpired = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`EmailExpiredPage.${key}`);
  return <RegistrationEmailResend translate={translate} />;
};

export default EmailExpired;
