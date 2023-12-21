import React from 'react';
import Image from 'next/image';

import f from './HeaderTranslation.module.scss';

export const LanguagesModal = function ({
  closeModal,
  language,
  onSelectChange,
}: {
  closeModal: () => void;
  onSelectChange: (value: string) => void;
  language: string;
}) {
  const langHandler = (lang: string) => {
    closeModal();
    if (lang === 'ru') {
      return onSelectChange('en');
    }
    onSelectChange('ru');
  };
  const languageForRender = (lang: string) => {
    return (
      <div
        className={f.container + ' ' + f.languagesContainer}
        onClick={() => langHandler(lang)}
      >
        <Image
          alt="no-image"
          src={
            lang === 'en'
              ? '/img/flag_russia.svg'
              : '/img/flag_united_kingdom.svg'
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
