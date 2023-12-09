import React from 'react';
import SignInContainer from './Sign-inContainer';
import { Metadata } from 'next';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Login page',
};

const SignInPage = () => {
  return (
    <>
      <Header />
      <SignInContainer />
    </>
  );
};

export default SignInPage;
