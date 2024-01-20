'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import { LanguagesModal } from './LanguagesModal';
import { useTranslation } from 'react-i18next';

import s from '@/app/(authorized)/my-profile/CreatePost/CreatePost.module.scss';
import f from './HeaderTranslation.module.scss';

export const TranslationSelect = () => {
  const { i18n } = useTranslation();
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const onSelectChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', String(value));
  };

  const fullLanguages: any = {
    ru: { name: 'Русский', img: '/img/flag_russia.svg' },
    en: { name: 'English', img: '/img/flag_united_kingdom.svg' },
  };

  return (
    <Popover.Root
      open={openChangeSize}
      onOpenChange={() => setOpenChangeSize(!openChangeSize)}
    >
      <div className={s.cropping__wrapper}>
        <Popover.Trigger className={f.container}>
          <div className={f.select}>
            <Image
              alt="flag-image"
              src={fullLanguages[language]['img']}
              width={20}
              height={20}
            />
            <span>{fullLanguages[language]['name']}</span>
          </div>
          <Image
            alt="arrow-image"
            src="/img/arrowDown-light.svg"
            width={20}
            height={20}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={f.popOver}>
            <LanguagesModal
              closeModal={() => setOpenChangeSize(false)}
              onSelectChange={onSelectChange}
              language={language}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
