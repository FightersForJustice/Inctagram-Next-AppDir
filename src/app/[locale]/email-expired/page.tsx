'use client';

import { useTranslations } from 'next-intl';
import { RegistrationEmailResend } from './RegistrationEmailResend';

const EmailExpired = () => {
  const t = useTranslations('EmailExpiredPage');

  return <RegistrationEmailResend translate={t} />;
};

export default EmailExpired;
