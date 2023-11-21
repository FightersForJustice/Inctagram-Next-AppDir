'use client';

import React from 'react';
import { SignIn } from './SignIn';
import { useTranslations } from 'next-intl';
import ServiceAuth from './SignIn/ServiceAuth';

const SignInPage = () => {
  const t = useTranslations('SignInPage');

  return (
    <>
      <div
        id={'sign-in'}
        className={
          'border-solid border-1 border-[--dark-300] bg-[--dark-500] rounded-md m-auto max-w-[378px] text-center mt-[100px]'
        }
      >
        <ServiceAuth />
        <SignIn translate={t} />
      </div>
    </>
  );
};

export default SignInPage;
