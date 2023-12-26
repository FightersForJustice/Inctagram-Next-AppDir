'use client';

import { ReactNode, useEffect, useState } from 'react';
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
import { AuthSubmit } from '@/components/Input';

import s from './ForgotPasswordForm.module.scss';
import f from './EmailSentModal.module.scss';

type Props = {
  translate: (value: string) => ReactNode;
};

export const ForgotPasswordForm = ({ translate }: Props) => {
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

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!;

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
      <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
        <EmailForm
          translate={translate}
          register={register}
          error={errors.email}
          registerName="email"
          errorMessage={errors?.email?.message}
        />

        <p className={s.instruction}>{translate('desc')}</p>

        {sendLinkAgain && (
          <p className={s.sendAgain}>{translate('descAfterSend')}</p>
        )}
        <div className={s.authSubmit}>
          <AuthSubmit
            value={`${
              sendLinkAgain
                ? `${translate('btnNameAfterSend')}`
                : `${translate('btnName')}`
            }`}
            disabled={!recaptcha || !isValid}
            sendLinkAgain={sendLinkAgain}
          />
        </div>

        <Link href={'/sign-in'} className={s.forgotRedirect}>
          {translate('linkName')}
        </Link>

        {!sendLinkAgain && (
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={reCaptchaHandler}
            className={s.recaptchaContainer}
            theme="dark"
          />
        )}
      </form>
      {showModal && (
        <Modal title={'Email sent'} onClose={() => setShowModal(false)} isOkBtn>
          <p className={f.container}>
            {translate('modal')} <span>{userEmail}</span>
          </p>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};
