'use client';

import { useState } from 'react';
import Link from 'next/link';

import { HeaderNotification } from '@/components/Header/HeaderNotification';
import { TranslationSelect } from './HeaderTranslation/TranslationSelect';

import s from './Header.module.scss';

export const Header = () => {
  const currentLanguage = localStorage.getItem('language');

  if (!currentLanguage) {
    localStorage.setItem('language', 'en');
  }

  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'en'
  );

  const onSelectChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('language', String(value));
  };

  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Link href={'/my-profile'} className={s.logo}>
          Inctagram
        </Link>

        <div className={s.notificationContainer}>
          <HeaderNotification language={language} />
          <TranslationSelect
            language={language}
            onSelectChange={onSelectChange}
          />
        </div>
      </div>
    </header>
  );
};
