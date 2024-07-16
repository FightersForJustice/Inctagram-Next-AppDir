'use client';

import { SignInForm } from '@/components/auth';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { io } from "socket.io-client";
import ServiceAuth from '@/components/auth/ServiceAuth/ServiceAuth';

import s from './SignIn.module.scss';

const SignInPage = () => {
  return (
    <div id={'sign-in'} className={s.container}>
      <ServiceAuth page={'SignInPage'} />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
