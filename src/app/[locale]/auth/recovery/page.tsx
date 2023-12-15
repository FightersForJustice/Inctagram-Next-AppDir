'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CreateNewPasswordForm } from './CreateNewPasswordForm';
import s from './recovery.module.scss';

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
    <div className={s.container}>
      <p className={s.title}>{t('title')}</p>
      <CreateNewPasswordForm translate={t} />
    </div>
  );
};

export default CreateNewPassword;
