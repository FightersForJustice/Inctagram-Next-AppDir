'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import s from './Verification.module.scss';

const EmailVerification = () => {
  const t = useTranslations('EmailVerificationPage');

  return (
    <div>
      <div className={s.container}>
        <h1 className={s.slogan}>{t('title')}</h1>
        <p className={s.verificationText}>{t('desc')}</p>
        <Link href={'/sign-in'} className={s.resendLink}>
          {t('btnName')}
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
