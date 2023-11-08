'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const VerificationInvalid = () => {
  const t = useTranslations('VerificationInvalidPage');

  return (
    <div
      className={'flex flex-col justify-center items-center mt-[100px] mb-9'}
    >
      <h1 className={'text-[20px] mb-[19px]'}>{t('title')}</h1>
      <p className={'max-w-[300px] text-center mb-[30px]'}>{t('desc')}</p>
      <button
        className={
          'text-[--light-100] bg-[--primary-500] pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[31px]'
        }
      >
        {t('btnName')}
      </button>
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
