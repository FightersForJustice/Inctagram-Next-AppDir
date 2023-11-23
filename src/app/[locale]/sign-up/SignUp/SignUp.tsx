import React from 'react';
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
    <div
      className={
        'border-solid border-1 border-[--dark-300] bg-[#171717] rounded-md m-auto mt-[100px] max-w-[378px] text-center'
      }
    >
      <ServiceAuth page={'SignUpPage'} />
      <SignUpForm lang={lang} translate={t} />
    </div>
  );
};
