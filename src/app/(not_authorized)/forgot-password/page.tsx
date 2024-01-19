'use client';

import { useTranslation } from 'react-i18next';
import { ForgotPasswordForm } from '@/components/auth';

import s from './Forgot-Password.module.scss';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`ForgotPasswordPage.${key}`);
  return (
    <div className={s.container}>
      <p className={s.title}>{translate('title')}</p>
      <ForgotPasswordForm translate={t} />
    </div>
  );
};

export default ForgotPassword;
