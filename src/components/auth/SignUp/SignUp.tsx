'use client';

import s from './SignUp.module.scss';
import { SignUpForm } from '@/components/auth';

export const SignUp = () => {
  return (
    <div className={s.container}>
      <SignUpForm />
    </div>
  );
};
