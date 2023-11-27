import React, { FC, ReactNode, useState } from 'react';
import s from './SignIn.module.scss';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { redirect } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { FormItem } from '../../sign-up/SignUp/SignUpForm/FormItem';
import { SignInSchema } from '@/features/schemas';
import { usePostLoginMutation } from '@/api';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { IUserLoginRequest } from '@/types/userTypes';
import { AuthSubmit } from '@/components/Input';
import { toast } from 'react-toastify';
import { ServerError } from '@/types/serverResponseTyper';

type Props = {
  translate: (value: string) => ReactNode;
};

export const SignIn: FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema()),
    mode: 'onTouched',
  });
  const [showPass, setShowPass] = useState(true);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [postLogin, { isLoading }] = usePostLoginMutation();

  const onSubmit = async (data: IUserLoginRequest) => {
    const { email, password } = data;
    try {
      await postLogin({ email: email.toLowerCase(), password }).unwrap();
      reset();
    } catch (error) {
      const {
        status,
        data: { messages },
      } = error as ServerError; 
      if (status < 500) {
        const message = `${translate(`error${status}`)}`
        setError('password', {
          type: 'custom',
          message,
        });
      } else {
        toast.error(messages);
      }
    }
  };

  if (isAuth) {
    redirect('/my-profile');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <FormItem
          marginTop={'mt-[20px]'}
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={'email'}
          translateName={'email'}
          id={'sign-in-email-input'}
        />
        <FormItem
          marginTop={'mt-[25px]'}
          marginBottom={'mb-[35px]'}
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
        <Link
          href={'/forgot-password'}
          className={s.forgot}
          id={'sign-in-link-forgot-password'}
        >
          {translate('forgotPass')}
        </Link>
        <AuthSubmit
          id={'sign-in-submit'}
          value={String(translate('btnName'))}
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
      {isLoading && <Loader />}
    </>
  );
};
