import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostRegistrationConfirmationMutation } from '@/api/auth.api';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';

type Props = {
  code: string;
  translate: (value: string) => ReactNode;
};

export const Confirm: React.FC<Props> = ({ code, translate }) => {
  const [registrationConfirm, { isLoading }] =
    usePostRegistrationConfirmationMutation();
  const router = useRouter();
  const isConfirmed = sessionStorage.getItem('isConfirmed');

  const regularVariableForSearchCodeParamFromURL =
    window.location.search.match(/[?&]code=([^&]+)/);
  const actualCode = regularVariableForSearchCodeParamFromURL
    ? regularVariableForSearchCodeParamFromURL[1]
    : 'ERROR';
  useEffect(() => {
    if (isConfirmed !== 'yes') {
      registrationConfirm({ confirmationCode: code })
        .unwrap()
        .then()
        .catch((err) => {
          registrationConfirm({ confirmationCode: actualCode }).catch((err) => {
            toast.error('Error confirmation');
            if (err.data.error) {
              router.push('/email-expired');
            }
          });
        });
      sessionStorage.setItem('isConfirmed', 'yes');
    } else {
      sessionStorage.removeItem('isConfirmed');
    }
  }, []);

  return (
    <div
      className={'flex flex-col justify-center items-center mt-[100px] mb-9'}
    >
      <h1 className={'text-[20px] mb-[19px]'}>{translate('title')}</h1>
      <p className={'max-w-[300px] text-center mb-[54px]'}>
        {translate('desc')}
      </p>
      <Link
        href={'/sign-in'}
        className={
          'bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[72px]'
        }
      >
        {translate('btnName')}
      </Link>
      <Image
        src={'/img/congrats.svg'}
        alt={'congrats'}
        width={423}
        height={292}
      />
      {isLoading && <Loader />}
    </div>
  );
};
