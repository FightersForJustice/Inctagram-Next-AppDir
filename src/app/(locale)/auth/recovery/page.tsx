'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import s from './recovery.module.scss';
import { CreateNewPasswordForm } from '@/components/auth';
import { useTranslation } from 'react-i18next';

const CreateNewPassword = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`RecoveryPage.${key}`);
  const parameters = useSearchParams();

  useEffect(() => {
    const code = sessionStorage.getItem('userEmailRecoveryCode');
    !code &&
      sessionStorage.setItem('userEmailRecoveryCode', parameters.get('code')!);
  }, []);

  return (
    <div className={s.container}>
      <p className={s.title}>{translate('title')}</p>
      <CreateNewPasswordForm translate={translate} />
    </div>
  );
};

export default CreateNewPassword;
