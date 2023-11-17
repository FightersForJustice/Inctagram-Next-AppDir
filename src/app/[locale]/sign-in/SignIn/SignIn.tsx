import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { redirect } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { FormItem } from '../../sign-up/SignUp/SignUpForm/FormItem';
import { toast } from 'react-toastify';
import { SignInSchema } from '@/features/schemas';
import { usePostLoginMutation } from '@/api';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { IUserLoginRequest } from '@/types/userTypes';

type Props = {
  translate: (value: string) => ReactNode;
};

export const SignIn: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(SignInSchema()),
    mode: 'onTouched',
  });
  const [showPass, setShowPass] = useState(true);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [postLogin, { isLoading }] = usePostLoginMutation();

  const onSubmit = async (data: IUserLoginRequest) => {
    try {
      await postLogin(data).unwrap();
    } catch (error) {
      const {
        data: { messages },
      } = error as { data: { messages: string } };
      toast.error(messages);
    } finally {
      reset();
    }
  };

  if (isAuth) {
    redirect('/my-profile');
  }
  const passwordPlaceholder = String.fromCharCode(8727).repeat(10);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'mt-[24px] mb-2 pb-[24px]'}
      >
        <FormItem
          marginTop={'mt-[18px]'}
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={'email'}
          translateName={'email'}
          id={'sign-in-email-input'}
          placeholder="Epam@epam.com"
        />
        <FormItem
          marginTop={'mt-[18px]'}
          marginBottom={'mb-[48px]'}
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
          placeholder={`${passwordPlaceholder}`}
        />
        <Link
          href={'/forgot-password'}
          className={'flex justify-end mr-[20px] text-[--light-900]'}
          id={'sign-in-link-forgot-password'}
        >
          {translate('forgotPass')}
        </Link>

        <input
          type="submit"
          className={
            'mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer mt-[24px] disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed'
          }
          value={String(translate('btnName'))}
          id={'sign-in-submit'}
          disabled={!isValid}
        />
        <p className={'pb-5'}>{translate('question')}</p>
        <Link
          href={'/sign-up'}
          className={'text-[--primary-500]'}
          id={'sign-in-link-sign-up'}
        >
          {translate('btnBottomName')}
        </Link>
      </form>
      {isLoading && <Loader />}
    </>
  );
};
