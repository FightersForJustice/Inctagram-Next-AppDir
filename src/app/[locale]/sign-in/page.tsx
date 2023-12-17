'use client';

import s from './SignIn.module.scss';
import { ServiceAuth, SignInForm } from '@/components/auth';
import { useTranslations } from 'next-intl';

const SignInPage = () => {
  const t = useTranslations('SignInPage');

  return (
    <div id={'sign-in'} className={s.container}>
      <ServiceAuth page={'SignInPage'} />
      <SignInForm translate={t} />
    </div>
  );
};

export default SignInPage;
