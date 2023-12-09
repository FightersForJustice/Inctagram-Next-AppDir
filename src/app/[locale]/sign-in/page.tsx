import React from 'react';
import SignInContainer from './Sign-inContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Login page',
};

const SignInPage = () => {
  return (
    <>
      <SignInContainer />
    </>
  );
};

export default SignInPage;
