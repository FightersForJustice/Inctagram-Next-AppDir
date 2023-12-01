import React from 'react';
import s from './SignUp.module.scss';
import { SignUpForm } from './SignUpForm';
import { useTranslations } from 'next-intl';
import ServiceAuth from '../../sign-in/SignIn/ServiceAuth';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { redirect } from 'next/navigation';

type Props = {
  lang: 'en' | 'ru';
};

export const SignUp: React.FC<Props> = ({ lang }) => {
  const t = useTranslations('SignUpPage');
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    redirect('/my-profile');
  }

  return (
    <div className={s.container}>
      <ServiceAuth page={'SignUpPage'} />
      <SignUpForm lang={lang} translate={t} />
    </div>
  );
};
