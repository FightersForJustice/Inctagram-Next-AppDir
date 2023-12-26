'use client';

import { useTranslations } from 'next-intl';
import { CreateNewPasswordForm } from '@/components/auth';

import s from './recovery.module.scss';

const CreateNewPassword = ({
  searchParams,
}: {
  searchParams?: {
    code?: string;
  };
}) => {
  
  const t = useTranslations('RecoveryPage');

  return (
    <div className={s.container}>
      <p className={s.title}>{t('title')}</p>
      <CreateNewPasswordForm newPasswordCode={searchParams?.code} translate={t} />
    </div>
  );
};

export default CreateNewPassword;
