import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { usePostPasswordRecoveryMutation } from '@/api/auth.api';
import { Modal } from '@/components/Modals/Modal';
import { Loader } from '@/components/Loader';
import { EmailForm } from './EmailForm';
import { ForgotPasswordSchema } from '@/features/schemas';
import { handleApiError } from '@/utils';

type Props = {
  translate: (value: string) => ReactNode;
};

export const ForgotPasswordForm: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema()),
    mode: 'onTouched',
  });

  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [recaptcha, setRecaptcha] = useState('');
  const [sendLinkAgain, setSendLinkAgain] = useState(false);

  const [recoveryPassword, { isSuccess, isLoading, error }] =
    usePostPasswordRecoveryMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
      setSendLinkAgain(true);
    }
  }, [isSuccess]);

  const onSubmit = (data: any) => {
    try {
      recoveryPassword({
        email: data.email,
        recaptcha,
      });
      setUserEmail(data.email);
    } finally {
      reset();
    }
  };

  const reCaptchaHandler = (token: string | null) => {
    setRecaptcha(token!);
  };

  if (error) {
    handleApiError(error);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'my-[24px] mx-5'}>
        <EmailForm
          translate={translate}
          register={register}
          error={errors.email}
          registerName="email"
          errorMessage={errors?.email?.message}
        />

        <p className={'pt-2 max-w-[100%] text-left text-[--light-900]'}>
          {translate('desc')}
        </p>

        {sendLinkAgain && (
          <p
            className={
              'max-w-[100%] text-left text-[--light-300] my-[20px] text-[15px]'
            }
          >
            {translate('descAfterSend')}
          </p>
        )}

        <input
          type="submit"
          className={
            'my-[24px] bg-[--primary-500] w-[100%] py-[6px] cursor-pointer disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed'
          }
          value={`${
            sendLinkAgain
              ? `${translate('btnNameAfterSend')}`
              : `${translate('btnName')}`
          }`}
          disabled={!recaptcha || !isValid}
        />

        <Link
          href={'/sign-in'}
          className={'font-medium text-[--primary-500] block mb-[30px]'}
        >
          {translate('linkName')}
        </Link>

        <ReCAPTCHA
          sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ"
          onChange={reCaptchaHandler}
          className={'flex justify-center items-center'}
          theme="dark"
        />
      </form>
      {showModal && (
        <Modal
          title={'Email sent'}
          onClose={() => setShowModal(false)}
          isOkBtn={true}
        >
          {translate('modal')}{' '}
          <span className={'text-blue-300'}>{userEmail}</span>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};
