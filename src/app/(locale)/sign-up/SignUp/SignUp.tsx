'use client';

import s from './SignUp.module.scss';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  return (
    <div className={s.container}>
      <SignUpForm />
    </div>
  );
};