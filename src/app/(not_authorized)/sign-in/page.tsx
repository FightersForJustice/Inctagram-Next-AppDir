'use client';

import { useSelector } from 'react-redux';

import ServiceAuth from '@/components/auth/ServiceAuth/ServiceAuth';
import { SignInForm } from '@/components/auth';
import { appIsLoad } from '@/redux/reducers/app/appSelectors';
import { Loader } from '@/components/Loader';

import s from './SignIn.module.scss';
import { useAppLoad } from '@/redux/hooks/useAppLoad';
import React from 'react';

const SignInPage = () => {
  useAppLoad(false)
  const isLoad = useSelector(appIsLoad);
  console.log(isLoad, !!isLoad);
  return (
    <div id={'sign-in'} className={s.container}>
      {isLoad && <Loader />}
      <ServiceAuth page={'SignInPage'} />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
