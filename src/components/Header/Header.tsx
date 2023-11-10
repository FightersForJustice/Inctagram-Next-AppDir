import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { HeaderTranslation } from './HeaderTranslation';

export const Header = () => {
  const [language, setLanguage] = useState<string | null>(null);
  console.log(language)
  useEffect(() => {
    console.log('useEffect')
    setLanguage(/\/ru/.test(location.pathname) ? 'ru' : 'en');
  }, []);

  return (
    <header
      className={
        'border-b-1 bg-[--dark-700] border-[--dark-300] fixed w-[100%] z-10 '
      }
    >
      <div
        className={'px-16 m-auto h-[60px] flex items-center justify-between'}
      >
        <Link
          href={'/my-profile'}
          className={'text-[26px] font-semibold leading-[36px]'}
        >
          Inctagram
        </Link>

        <div className={'flex justify-center items-center gap-[54px]'}>
          <HeaderNotification />
          <HeaderTranslation language={language || 'ru'} setLanguage={setLanguage} />
        </div>
      </div>
    </header>
  );
};
