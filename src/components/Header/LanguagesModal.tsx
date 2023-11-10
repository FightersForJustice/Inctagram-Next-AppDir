import React from 'react';
import Image from 'next/image';

export const LanguagesModal = ({
  setLanguage,
  language,
  onSelectChange,
}: {
  setLanguage: (language: string) => void;
  onSelectChange: (value: string) => void;
  language: string;
}) => {
  const onChangeSelectOption = (language: string) => {
    setLanguage(language);
    onSelectChange(language);
  };
  const langHandler = (lang: string) => {
    if (lang === 'ru') {
      onChangeSelectOption('en');
    } else {
      onChangeSelectOption('ru');
    }
  };
  const languageForRender = (lang: string) => {
    return (
      <div
        className={
          'flex items-center justify-start gap-2 w-[163px] cursor-pointer border-1 border-[--dark-100] px-[12px] mt-[-6px] py-[6px] bg-black'
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
        <span>{lang === 'ru' ? 'English' : 'Russian'}</span>
      </div>
    );
  };
  return <div>{languageForRender(language)}</div>;
};
