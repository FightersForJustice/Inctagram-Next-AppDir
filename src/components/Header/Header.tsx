'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next-intl/client';

import { HeaderNotification } from '@/components/Header/HeaderNotification';

import { TranslationSelect } from './HeaderTranslation/TranslationSelect';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState<string>(
    /\/ru/.test(location.pathname) ? 'ru' : 'en'
  );
  console.log('lang changed:', language);
  useEffect(() => {
    setLanguage(/\/ru/.test(location.pathname) ? 'ru' : 'en');
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}${pathname}`);
    });
  };
  return (
    <header
      className={
        'border-b-1 bg-[--dark-700] border-[--dark-300] fixed w-[100%] z-10'
      }
    >
      <div
        className={
          'max-w-[1280px] px-[60px] m-auto h-[60px] flex items-center justify-between'
        }
      >
        <Link
          href={'/my-profile'}
          className={'text-[26px] font-semibold leading-[36px]'}
        >
          Inctagram
        </Link>

        <div className={'flex justify-center items-center gap-[54px]'}>
          <HeaderNotification />
          <TranslationSelect
            language={language}
            onSelectChange={onSelectChange}
          />
        </div>
      </div>
    </header>
  );
};
