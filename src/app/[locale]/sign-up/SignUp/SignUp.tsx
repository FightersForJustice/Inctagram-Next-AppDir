'use client'

import s from './SignUp.module.scss';
import { SignUpForm } from './SignUpForm';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { redirect } from 'next/navigation';



export const SignUp = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    redirect('/my-profile');
  }

  return (
    <div className={s.container}>
      <SignUpForm />
    </div>
  );
};
