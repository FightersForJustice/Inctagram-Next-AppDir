import React, { memo } from 'react';
import Image from 'next/image';

export const LanguagesModal = memo(function ({
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
      onSelectChange('en');
    } else {
      onSelectChange('ru');
    }
  };
  const languageForRender = (lang: string) => {
    return (
      <div
        className={
          'flex items-center justify-start gap-2 w-[163px] cursor-pointer border-1 border-[--dark-100] px-[12px] py-[6px] bg-black'
        }
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
});
