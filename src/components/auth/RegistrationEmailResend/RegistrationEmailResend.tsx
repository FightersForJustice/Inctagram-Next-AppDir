'use client';
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/Modals/Modal';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { usePostRegistrationEmailResendingMutation } from '@/api';
import s from './RegistrationEmailResend.module.scss';
import f from './EmailSentModal.module.scss';

type Props = {
  translate: (value: string) => ReactNode;
};

export const RegistrationEmailResend = ({ translate }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [resend, { isSuccess, isLoading }] =
    usePostRegistrationEmailResendingMutation();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserEmail(localStorage.getItem('user-email')!);
    }
    if (isSuccess) setShowModal(true);
  }, [isSuccess]);

  const onResend = () => {
    resend({ email: userEmail! })
      .unwrap()
      .then()
      .catch((err) => toast.error(err.error));
  };

  return (
    <>
      <div className={s.container}>
        <h1 className={s.slogan}>{translate('title')}</h1>
        <p className={s.verificationText}>{translate('desc')}</p>
        <button className={s.resendLink} onClick={onResend}>
          {translate('btnName')}
        </button>
        <Image
          className={s.imgContainer}
          src={'/img/expired.svg'}
          alt={'congrats'}
          width={473}
          height={352}
        />
      </div>
      {showModal && (
        <Modal title={'Email sent'} onClose={() => setShowModal(false)} isOkBtn>
          <p className={f.container}>
            We have sent a link to confirm your email to{' '}
            <span>{userEmail}</span>
          </p>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};
