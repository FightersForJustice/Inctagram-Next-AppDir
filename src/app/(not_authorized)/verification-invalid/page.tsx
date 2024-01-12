'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import s from './Verification.module.scss';

const VerificationInvalid = () => {
 
 
  const { t } = useTranslation();
  const translate = (key: string): string => t(`VerificationInvalidPage.${key}`);
  return (
    <div className={s.container}>
      <h1 className={s.slogan}>{translate('title')}</h1>
      <p className={s.verificationText}>{translate('desc')}</p>
      <button className={s.resendLink}>{translate('btnName')}</button>
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
