'use client';

import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getIpAddress, signInAction } from '@/app/lib/actions';
import { AuthSubmit, FormItem } from '@/components/Input';
import { SignInSchema } from '@/features/schemas';
import { SignInData } from '@/features/schemas/SignInSchema';
import { AUTH_ROUTES } from '@/appRoutes/routes';
import { Loader } from '@/components/Loader';
import s from './SignInForm.module.scss';
import Cookies from 'js-cookie';
import {useLoginAdminMutation} from '@/queries/login/login.generated';

export const SignInForm = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`SignInPage.${key}`);
  const translateErrors = (key: string): string => t(`Errors.${key}`);
  const router = useRouter();
  const [loadingSignIn, setLoading] = useState(false);
  const [mutateFunction, {data, loading, error}] = useLoginAdminMutation();

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

  const processForm: SubmitHandler<SignInData> = async (formData) => {
    setLoading(true);
    const userAgent = window.navigator.userAgent;
    formData.email = formData.email.toLowerCase();
    const ipAddress = await getIpAddress();
    if (
      formData.email === 'admin@gmail.com' &&
      formData.password === '11admin'
    ) {
      // const signInResult = await signInAction(data, userAgent, ipAddress);

      //admin login
      const res = mutateFunction({
        variables: { email: formData.email, password: 'admin' },
      });
      const data1 = await res;
      if (data1.data?.loginAdmin.logged) {
        const name = btoa('admin');
        const lastname = btoa('admin@gmail.com');
        Cookies.set('corn', `${name + '-/-' + lastname}`)
        return router.push('admin/userslist');
      }
      // if (signInResult?.success) {
      //   router.push('/api');
      // }
      // console.log(signInResult)
      else {
        const statusCode = data1?.errors;
        const statusMessage = `login.error${statusCode}`;
        setLoading(false);
        setError('password', {
          type: 'manual',
          message: statusMessage,
        });
      }
    }

    const signInResult = await signInAction(formData, userAgent, ipAddress);

    setLoading(false);
    if (signInResult?.success) {
      router.push('/api');
    } else {
      const statusCode = signInResult?.error.statusCode;
      const statusMessage = `login.error${statusCode}`;
      setLoading(false);
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
      {loadingSignIn && <Loader />}
    </form>
  );
};
