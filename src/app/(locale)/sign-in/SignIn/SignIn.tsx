'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormItem } from '../../sign-up/SignUp/SignUpForm/FormItem';
import { SignInSchema } from '@/features/schemas';
import { AuthSubmit } from '@/components/Input';
import { SingInData } from '@/features/schemas/SignInSchema';
import { signInAction } from '@/app/actions';

import s from './SignIn.module.scss';
import { setAuthCookie } from '@/utils/cookiesActions';

export const SignIn = () => {
  const translate = useTranslations('SignInPage');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema()),
    mode: 'onTouched',
  });
  const [showPass, setShowPass] = useState(true);

  const processForm: SubmitHandler<SingInData> = async (data) => {
    const result = await signInAction(data);

    if (!result) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      const statusCode = result.error.statusCode;
      const statusMessage = `error${statusCode}`;
      setError('password', {
        type: 'manual',
        message: translate(statusMessage),
      });
    }

    if (result.data) {
      setAuthCookie('accessToken', result.data.accessToken);
      setAuthCookie('refreshToken', result.data.refreshToken);

      router.push('/my-profile');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <FormItem
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={'email'}
          translateName={'email'}
          id={'sign-in-email-input'}
        />
        <FormItem
          translate={translate}
          register={register}
          error={errors.password}
          errorMessage={errors?.password?.message}
          registerName={'password'}
          translateName={'password'}
          id={'sign-in-password-input'}
          showPasswordIcon={true}
          show={showPass}
          setShow={setShowPass}
        />
        <div className={s.forgot}>
          <Link
            href={'/forgot-password'}
            className={errors.password ? s.password : ''}
            id={'sign-in-link-forgot-password'}
          >
            {translate('forgotPass')}
          </Link>
        </div>
        <AuthSubmit
          id={'sign-in-submit'}
          value={String(translate('btnName'))}
          error={errors.password ? errors.password + '' : ''}
          disabled={!isValid}
        />
        <p className={s.alreadyHaveText}>{translate('question')}</p>
        <Link
          href={'/sign-up'}
          className={s.signUpBtn}
          id={'sign-in-link-sign-up'}
        >
          {translate('btnBottomName')}
        </Link>
      </form>
    </>
  );
};
