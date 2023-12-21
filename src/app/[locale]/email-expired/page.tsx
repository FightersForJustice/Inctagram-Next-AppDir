'use client';

import { useTranslations } from 'next-intl';
import { RegistrationEmailResend } from '@/components/auth';

const EmailExpired = () => {
  const t = useTranslations('EmailExpiredPage');

  return <RegistrationEmailResend translate={t} />;
};

export default EmailExpired;
