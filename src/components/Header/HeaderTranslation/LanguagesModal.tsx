import React from 'react';
import Image from 'next/image';

import f from './HeaderTranslation.module.scss';

export const LanguagesModal = function ({
  closeModal,
  language,
  onSelectChange,
  isEn,
}: {
  closeModal: () => void;
  onSelectChange: (value: string) => void;
  language: string;
  isEn: boolean;
}) {
  const langHandler = (lang: string, e: React.MouseEvent) => {
    if (window.screen.width > 521 || e.currentTarget.id === 'isMobile') {
      console.log(e.currentTarget.id, lang)
      closeModal();
      if (lang === 'ru') {
        return onSelectChange('en');
      }
      onSelectChange('ru');
    }
  };
  console.log(!isEn);

  const finalLang = window.screen.width < 521 ? '/img/flag_russia.svg' : '/img/flag_united_kingdom.svg'
  const isMobileLanguage = window.screen.width < 521 && !isEn ? f.active : '';
  const languageForRender = (lang: string) => {
    return (
      <div
        className={
          f.container + ' ' + f.languagesContainer + ' ' + isMobileLanguage
        }
        id='isMobile'
        onClick={(e) => langHandler(lang, e)}
      >
        <Image
          alt="no-image"
          src={
            lang === 'en'
              ? '/img/flag_russia.svg'
              :  finalLang
          }
          width={20}
          height={20}
        />
        <span>{lang === 'ru' ? 'English' : 'Русский'}</span>
      </div>
    );
  };
  return <div>{languageForRender(language)}</div>;
};
