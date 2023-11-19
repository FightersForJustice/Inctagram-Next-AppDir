'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { StatusCode, usePostAuthorizationMutation } from '@/api/auth.api';
import { SignUpFormSchema } from '@/features/schemas';
import { Loader } from '@/components/Loader';
import { EmailSentModal } from './EmailSentModal';
import { FormItem } from './FormItem';
import { AgreeCheckbox } from './AgreeCheckbox';
import { toast } from 'react-toastify';
import { SignUpFormProps, SubmitProps } from './typesSignUp';

export const SignUpForm: React.FC<SignUpFormProps> = ({ lang, translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(SignUpFormSchema()),
    mode: 'onTouched',
  });

  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const resetObj = {
    name: '',
    agreements: false,
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [postAuthorization, { isSuccess, isLoading }] =
    usePostAuthorizationMutation();

  useEffect(() => {
    isSuccess && setShowModal(true);
    reset(resetObj);
  }, [isSuccess]);

  const translateError = (err: string) => {
    switch (err) {
      case 'User with this userName is already exist':
        return String(translate('nameExist'));
      case 'User with this email is already exist':
        return String(translate('emailExist'));
      default:
        break;
    }
  };

  const onSubmit = (data: SubmitProps) => {
    try {
      postAuthorization({
        userName: data.userName,
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .catch((err) => {
          if (err?.data?.statusCode === StatusCode.badRequest) {
            setError(err.data.messages[0]?.field, {
              message: translateError(err.data.messages[0]?.message),
            });
          } else {
            toast.error(err.error);
          }
        });
      setUserEmail(data.email);
    } catch (error) {
      console.log({ error });
    }
  };
  const passwordPlaceholder = String.fromCharCode(8727).repeat(20);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={' mt-[24px] mb-2 pb-[24px]'}
      >
        <FormItem
          marginTop={'mt-7'}
          translate={translate}
          register={register}
          error={errors.userName}
          errorMessage={errors?.userName?.message}
          registerName={'userName'}
          translateName={'name'}
          id={'sign-up-userName'}
          watch={watch}
        />

        <FormItem
          marginTop={'mt-[18px]'}
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={'email'}
          translateName={'email'}
          id={'sign-up-email'}
          watch={watch}
        />

        <FormItem
          marginTop={'mt-[18px]'}
          translate={translate}
          register={register}
          error={errors.password}
          errorMessage={errors?.password?.message}
          registerName={'password'}
          translateName={'password'}
          id={'sign-up-password'}
          show={showPass}
          setShow={setShowPass}
          showPasswordIcon={true}
          watch={watch}
        />

        <FormItem
          marginTop={'mt-[18px]'}
          marginBottom={'mb-[18px]'}
          translate={translate}
          register={register}
          error={errors.passwordConfirm}
          errorMessage={errors?.passwordConfirm?.message}
          registerName={'passwordConfirm'}
          translateName={'passwordConf'}
          id={'sign-up-passwordConfirm'}
          show={showConfirmPass}
          setShow={setShowConfirmPass}
          showPasswordIcon={true}
          watch={watch}
        />

        <AgreeCheckbox
          translate={translate}
          register={register}
          error={errors.agreements}
          errorMessage={errors?.agreements?.message}
          registerName={'agreements'}
          id={'sign-up-agreemets'}
        />

        <input
          type="submit"
          className={
            'mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed '
          }
          id={'sign-up-submit'}
          value={String(translate('btnName'))}
          disabled={!isValid}
        />
        <p className={'pb-5'}>{translate('question')}</p>
        <Link
          href={'/sign-in'}
          className={'text-[--primary-500]'}
          id={'sign-up-link-to-sign-in'}
        >
          {translate('btnBottomName')}
        </Link>
      </form>
      {showModal && (
        <EmailSentModal
          translate={String(translate('sentEmailConfirm'))}
          userEmail={userEmail}
          setShowModal={setShowModal}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};
