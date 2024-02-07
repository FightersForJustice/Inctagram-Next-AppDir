'use client';

import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import { LanguagesModal } from './LanguagesModal';
import { useTranslation } from 'react-i18next';

import s from '@/app/(authorized)/CreatePost/CreatePost.module.scss';
import f from './HeaderTranslation.module.scss';

export const TranslationSelect = () => {
  const { i18n } = useTranslation();
  const isMobileSize = 768;
  const fullLanguages: any = {
    ru: { name: 'Русский', img: '/img/flag_russia.svg' },
    en: { name: 'English', img: '/img/flag_united_kingdom.svg' },
  };
  const [currentWidth, setWidth] = useState(1000);
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isEn, setEn] = useState(true);
  const getWidth = () => setWidth(1000);
  useEffect(() => {
    function setScrollY() {
      window.addEventListener('resize', getWidth);
    }
    setScrollY();
    if (currentWidth > isMobileSize) {
      setOpenChangeSize(false);
    }
  }, [currentWidth]);
  const isOpen = currentWidth < isMobileSize ? true : false;
  let isMobileLanguage = isEn && currentWidth < isMobileSize && f.active;

  const onSelectChange = (value: string) => {
    if (currentWidth > isMobileSize) {
      setLanguage(value);
      i18n.changeLanguage(value);
      localStorage.setItem('language', String(value));
      return;
    }
  };

  const mobileHandler = (value: boolean) => {
    if (currentWidth < isMobileSize && !isEn && value) {
      setEn(true);
      setLanguage('en');
      i18n.changeLanguage('en');
      localStorage.setItem('language', String('en'));
      return;
    }
    if (currentWidth < isMobileSize && isEn && !value) {
      setEn(false);
      i18n.changeLanguage('ru');
      setLanguage('ru');
      return localStorage.setItem('language', String('ru'));
    }
  };

  let finalImage =
    currentWidth < isMobileSize
      ? fullLanguages['en']['img']
      : fullLanguages[language]['img'];

  return (
    <Popover.Root
      open={isOpen || openChangeSize}
      onOpenChange={() => setOpenChangeSize(!openChangeSize)}
    >
      <div className={s.cropping__wrapper + ' ' + isMobileLanguage}>
        <Popover.Trigger
          className={f.container}
          onClick={() => mobileHandler(true)}
        >
          <div className={f.select}>
            <Image alt="flag-image" src={finalImage} width={20} height={20} />
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
          <Popover.Content
            className={f.popOver}
            onClick={() => mobileHandler(false)}
          >
            <LanguagesModal
              closeModal={() => setOpenChangeSize(false)}
              onSelectChange={onSelectChange}
              language={language}
              isEn={isEn}
              isMobileSize={isMobileSize}
              currentWidth={currentWidth}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
