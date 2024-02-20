'use client';
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostRegistrationConfirmationMutation } from '@/api/auth.api';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import s from './Confirm.module.scss';
import { AUTH_ROUTES } from '@/appRoutes/routes';

type Props = {
  code: string;
  translate: (value: string) => ReactNode;
};

export const Confirm = ({ code, translate }: Props) => {
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
              router.push(AUTH_ROUTES.EMAIL_EXPIRED);
            }
          });
        });
      sessionStorage.setItem('isConfirmed', 'yes');
    } else {
      sessionStorage.removeItem('isConfirmed');
    }
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.slogan}>{translate('title')}</h1>
      <p className={s.confirmationText}>{translate('desc')}</p>
      <Link href={AUTH_ROUTES.SIGN_IN} className={s.resendLink}>
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
