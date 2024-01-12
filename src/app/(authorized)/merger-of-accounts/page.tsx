'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const MergerOfAccounts = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MergerOfAccountsPage.${key}`);
  return (
    <div
      className={'flex flex-col justify-center items-center mt-[100px] mb-9'}
    >
      <h1 className={'text-[20px] mb-[19px]'}>{t('title')}</h1>
      <p className={'max-w-[300px] text-center mb-[30px]'}>
        {t('descBefore')} <span className={'text-blue-500'}>Epam@epam.com</span>{' '}
        {t('descAfter')}
      </p>
      <button
        className={
          'text-[--primary-500] border-1 border-[--primary-500] pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[24px]'
        }
      >
        {t('btnNameYes')}
      </button>
      <button
        className={
          'text-[--primary-500] border-1 border-[--primary-500] pt-[6px] pr-[65px] pb-[6px] pl-[65px] mb-[24px]'
        }
      >
        {t('btnNameNo')}
      </button>
      <Image src={'/img/merger.svg'} alt={'merger'} width={423} height={292} />
    </div>
  );
};

export default MergerOfAccounts;
