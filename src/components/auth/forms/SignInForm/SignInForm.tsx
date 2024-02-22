'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { signInAction } from '@/app/lib/actions';
import { AuthSubmit, FormItem } from '@/components/Input';
import { SignInSchema } from '@/features/schemas';
import { SignInData } from '@/features/schemas/SignInSchema';

import { AUTH_ROUTES } from '@/appRoutes/routes';
import { Loader } from '@/components/Loader';
import s from './SignInForm.module.scss';

export const SignInForm = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`SignInPage.${key}`);
  const translateErrors = (key: string): string => t(`Errors.${key}`);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const processForm: SubmitHandler<SignInData> = async (data) => {
    setLoading(true);
    data.email = data.email.toLowerCase();
    const signInResult = await signInAction(data);
    // setLoading(false);

    if (signInResult?.success) {
      router.push('/api');
    } else {
      const statusCode = signInResult?.error.statusCode;
      const statusMessage = `login.error${statusCode}`;
      setError('password', {
        type: 'manual',
        message: statusMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <FormItem
        translate={translate}
        register={register}
        error={errors.email}
        errorMessage={
          errors?.email?.message && translateErrors(errors?.email?.message)
        }
        registerName={'email'}
        translateName={'email'}
        id={'sign-in-email-input'}
      />
      <FormItem
        translate={translate}
        register={register}
        error={errors.password}
        errorMessage={
          errors?.password?.message &&
          translateErrors(errors?.password?.message)
        }
        registerName={'password'}
        translateName={'password'}
        id={'sign-in-password-input'}
        showPasswordIcon={true}
        show={showPass}
        setShow={setShowPass}
      />
      <div className={s.forgot}>
        <Link
          href={AUTH_ROUTES.FORGOT_PASSWORD}
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
        href={AUTH_ROUTES.SIGN_UP}
        className={s.signUpBtn}
        id={'sign-in-link-sign-up'}
      >
        {translate('btnBottomName')}
      </Link>
      {loading && <Loader />}
    </form>
  );
};
