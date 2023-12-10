'use client';

import { SignUp } from './SignUp';

const SignUpPage = ({ params }: { params: { locale: 'en' | 'ru' } }) => {
  return (
    <div>
      <SignUp lang={params.locale} />
    </div>
  );
};

export default SignUpPage;
