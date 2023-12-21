'use client';

import s from './Forgot-Password.module.scss';
import { useTranslations } from 'next-intl';
import { ForgotPasswordForm } from '@/components/auth';

const ForgotPassword = () => {
  const t = useTranslations('ForgotPasswordPage');

  return (
    <div className={s.container}>
      <p className={s.title}>{t('title')}</p>
      <ForgotPasswordForm translate={t} />
    </div>
  );
};

export default ForgotPassword;
