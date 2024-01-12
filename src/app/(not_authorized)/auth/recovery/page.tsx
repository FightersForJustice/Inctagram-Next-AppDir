'use client';

import { useTranslation } from 'react-i18next';
import { CreateNewPasswordForm } from '@/components/auth';

import s from './recovery.module.scss';

const CreateNewPassword = ({
  searchParams,
}: {
  searchParams?: {
    code?: string;
  };
}) => {
 
  const { t } = useTranslation();
  const translate = (key: string): string => t(`RecoveryPage.${key}`);
  return (
    <div className={s.container}>
      <p className={s.title}>{translate('title')}</p>
      <CreateNewPasswordForm
        newPasswordCode={searchParams?.code}
        translate={translate}
      />
    </div>
  );
};

export default CreateNewPassword;
