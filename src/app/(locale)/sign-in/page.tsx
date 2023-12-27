'use client';
import { SignInForm } from '@/components/auth';

import s from './SignIn.module.scss';
import { ServiceAuth } from '@/components/auth';

const SignInPage = () => {
  return (
    <div id={'sign-in'} className={s.container}>
      <ServiceAuth page={'SignInPage'} />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
