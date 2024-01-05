'use client';

import { useTranslation } from 'react-i18next';
import s from './Forgot-Password.module.scss';
import { ForgotPasswordForm } from '@/components/auth';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`ForgotPasswordPage.${key}`);
  return (
    <div className={s.container}>
      <p className={s.title}>{translate('title')}</p>
      <ForgotPasswordForm translate={translate} />
    </div>
  );
};

export default ForgotPassword;
