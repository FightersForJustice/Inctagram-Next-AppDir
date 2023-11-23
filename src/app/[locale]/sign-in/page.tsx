'use client';

import React from 'react';
import s from './SignIn.module.scss';
import { SignIn } from './SignIn';
import { useTranslations } from 'next-intl';
import ServiceAuth from './SignIn/ServiceAuth';

const SignInPage = () => {
  const t = useTranslations('SignInPage');

  return (
    <>
      <div id={'sign-in'} className={s.container}>
        <ServiceAuth />
        <SignIn translate={t} />
      </div>
    </>
  );
};

export default SignInPage;
