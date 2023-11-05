'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const ForgotPassword = () => {
  const t = useTranslations('ForgotPasswordPage');

  return (
    <div
      className={
        'bg-[#171717] rounded-md m-auto mt-[100px] max-w-[378px] text-center'
      }
    >
      <p className={'pt-[23px]'}>{t('title')}</p>
      <div className={'flex gap-[60px] justify-center mt-[13px]'}></div>
      <ForgotPasswordForm translate={t} />
    </div>
  );
};

export default ForgotPassword;
