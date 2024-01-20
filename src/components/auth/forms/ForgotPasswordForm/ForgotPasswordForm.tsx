'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { forgotPasswordAction } from '@/app/actions';
import { Modal } from '@/components/Modals/Modal';
import { EmailForm } from './EmailForm';
import { ForgotPasswordSchema } from '@/features/schemas';
import { AuthSubmit } from '@/components/Input';
import { useTranslation } from 'react-i18next';

import s from './ForgotPasswordForm.module.scss';
import f from './EmailSentModal.module.scss';

export const ForgotPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const translate = (key: string): string => t(`ForgotPasswordPage.${key}`);

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
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (data: { email: string }) => {
    const result = await forgotPasswordAction({
      email: data.email,
      recaptcha,
    });

    if (result?.success) {
      setUserEmail(data.email);
      reset();
      setShowModal(true);
      setSendLinkAgain(true);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } else toast.error(translate('errorCode'));
  };

  const reCaptchaHandler = (token: string | null) => {
    setRecaptcha(token!);
  };

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

        <ReCAPTCHA
          key={i18n.language}
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={reCaptchaHandler}
          className={s.recaptchaContainer}
          theme="dark"
          hl={i18n.language}
        />
      </form>
      {showModal && (
        <Modal title={'Email sent'} onClose={() => setShowModal(false)} isOkBtn>
          <p className={f.container}>
            {translate('modal')} <span>{userEmail}</span>
          </p>
        </Modal>
      )}
    </>
  );
};
