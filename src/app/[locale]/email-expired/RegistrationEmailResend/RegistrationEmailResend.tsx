import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/Modals/Modal';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { usePostRegistrationEmailResendingMutation } from '@/api';

type Props = {
  translate: (value: string) => ReactNode;
};

export const RegistrationEmailResend: React.FC<Props> = ({ translate }) => {
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
      <div
        className={'flex flex-col justify-center items-center mt-[100px] mb-9'}
      >
        <h1 className={'text-[20px] mb-[19px]'}>{translate('title')}</h1>
        <p className={'max-w-[300px] text-center mb-[30px]'}>
          {translate('desc')}
        </p>
        <button
          className={
            'bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[32px]'
          }
          onClick={onResend}
        >
          {translate('btnName')}
        </button>
        <Image
          src={'/img/expired.svg'}
          alt={'congrats'}
          width={423}
          height={292}
        />
      </div>
      {showModal && (
        <Modal
          title={'Email sent'}
          onClose={() => setShowModal(false)}
          isOkBtn={true}
        >
          We have sent a link to confirm your email to{' '}
          <span className={'text-blue-300'}>{userEmail}</span>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};
