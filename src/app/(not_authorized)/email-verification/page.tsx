'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import s from './Verification.module.scss';
import { AUTH_ROUTES } from '@/appRoutes/routes';

const EmailVerification = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`EmailVerificationPage.${key}`);
  return (
    <div>
      <div className={s.container}>
        <h1 className={s.slogan}>{translate('title')}</h1>
        <p className={s.verificationText}>{translate('desc')}</p>
        <Link href={AUTH_ROUTES.SIGN_IN} className={s.resendLink}>
          {translate('btnName')}
        </Link>
        <Image
          src={'/img/congrats.svg'}
          alt={'congrats'}
          width={423}
          height={300}
        />
      </div>
    </div>
  );
};

export default EmailVerification;
