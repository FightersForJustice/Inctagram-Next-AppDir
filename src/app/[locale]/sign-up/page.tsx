'use client';

import s from './SignUp.module.scss';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { redirect } from 'next/navigation';
import { SignUpForm } from '@/components/auth';

const SignUpPage = ({ params }: { params: { locale: 'en' | 'ru' } }) => {
  const t = useTranslations('SignUpPage');
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    redirect('/my-profile');
  }
  return (
    <div className={s.container}>
      <SignUpForm lang={params.locale} translate={t} />
    </div>
  );
};

export default SignUpPage;
