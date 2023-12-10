'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const EmailVerification = () => {
  const t = useTranslations('EmailVerificationPage');

  return (
    <div>
      <div
        className={'flex flex-col justify-center items-center mt-[100px] mb-9'}
      >
        <h1 className={'font-bold text-[20px] mb-[19px]'}>{t('title')}</h1>
        <p className={'max-w-[300px] text-center mb-[54px]'}>{t('desc')}</p>
        <Link
          href={'/sign-in'}
          className={'bg-[--primary-500] rounded-sm py-[6px] px-[34px] mb-[72px]'}
        >
          {t('btnName')}
        </Link>
        <Image
          src={'/img/congrats.svg'}
          alt={'congrats'}
          width={423}
          height={292}
        />
      </div>
    </div>
  );
};

export default EmailVerification;
