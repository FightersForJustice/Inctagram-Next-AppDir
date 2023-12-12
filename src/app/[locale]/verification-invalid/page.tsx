'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './Verification.module.scss';

const VerificationInvalid = () => {
  const t = useTranslations('VerificationInvalidPage');

  return (
    <div className={s.container}>
      <h1 className={s.slogan}>{t('title')}</h1>
      <p className={s.verificationText}>{t('desc')}</p>
      <button className={s.resendLink}>{t('btnName')}</button>
      <Image
        src={'/img/verification.svg'}
        alt={'verification'}
        width={473}
        height={352}
      />
    </div>
  );
};

export default VerificationInvalid;
