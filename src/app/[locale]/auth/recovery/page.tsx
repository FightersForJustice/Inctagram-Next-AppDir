'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CreateNewPasswordForm } from './CreateNewPasswordForm';

const CreateNewPassword = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  const t = useTranslations('RecoveryPage');

  const parameters = useSearchParams();

  useEffect(() => {
    const code = sessionStorage.getItem('userEmailRecoveryCode');
    !code &&
      sessionStorage.setItem('userEmailRecoveryCode', parameters.get('code')!);
  }, []);

  return (
    <div
      className={
        'text-xl border-solid border-1 mt-[120px] border-[--dark-300] bg-[--dark-500] rounded-md m-auto max-w-[378px] text-center'
      }
    >
      <p className={'font-bold pt-[23px]'}>{t('title')}</p>
      <CreateNewPasswordForm translate={t} />
    </div>
  );
};

export default CreateNewPassword;
