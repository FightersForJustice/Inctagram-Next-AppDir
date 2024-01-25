'use client';

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import { LanguagesModal } from './LanguagesModal';
import { useTranslation } from 'react-i18next';

import s from '@/app/(authorized)/CreatePost/CreatePost.module.scss';
import f from './HeaderTranslation.module.scss';

export const TranslationSelect = () => {
  const { i18n } = useTranslation();
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const [isEn, setEn] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage === 'en' || false});
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const onSelectChange = (value: string) => {
    if (window.screen.width > 521) {
      console.log('is shit!1');
      setLanguage(value);
      i18n.changeLanguage(value);
      localStorage.setItem('language', String(value));
      return;
    }
  };

  const mobileHandler = (value: boolean) => {
    if (window.screen.width < 521 && !isEn && value) {
      setEn(true);
      console.log(9)
      i18n.changeLanguage('en');
      localStorage.setItem('language', String('en'));
      return 
    }
    if (window.screen.width < 521 && isEn && !value) {
      setEn(false);
      i18n.changeLanguage('ru');
      return localStorage.setItem('language', String('ru'));
    }
    
  };

  const fullLanguages: any = {
    ru: { name: 'Русский', img: '/img/flag_russia.svg' },
    en: { name: 'English', img: '/img/flag_united_kingdom.svg' },
  };
  const isOpen = window.screen.width < 768 ? true : false

  const finalImage = window.screen.width < 768 ? fullLanguages['en']['img'] : fullLanguages[language]['img']

  const isMobileLanguage = isEn && window.screen.width < 768 ? f.active : '';

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={() => setOpenChangeSize(!openChangeSize)}
    >
      <div className={s.cropping__wrapper + ' ' + isMobileLanguage} >
        <Popover.Trigger className={f.container} onClick={()=>mobileHandler(true)}>
          <div className={f.select}>
            <Image
              alt="flag-image"
              src={finalImage}
              width={20}
              height={20}
            />
            <span>{fullLanguages[language]['name']}</span>
          </div>
          <Image
            className={f.translate_select}
            alt="arrow-image"
            src="/img/arrowDown-light.svg"
            width={20}
            height={20}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={f.popOver} onClick={()=>mobileHandler(false)}>
            <LanguagesModal
              closeModal={() => setOpenChangeSize(false)}
              onSelectChange={onSelectChange}
              language={language}
              isEn={isEn}
              
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
