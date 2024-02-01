import Image from 'next/image';

import f from './HeaderTranslation.module.scss';

export const LanguagesModal = function ({
  closeModal,
  language,
  onSelectChange,
  isEn,
  isMobileSize,
  currentWidth,
}: {
  closeModal: () => void;
  onSelectChange: (value: string) => void;
  language: string;
  isMobileSize: number;
  currentWidth: number;
  isEn: boolean;
}) {
  const langHandler = (lang: string, e: React.MouseEvent) => {
    if (currentWidth > isMobileSize || e.currentTarget.id === 'isMobile') {
      console.log(e.currentTarget.id, lang);
      closeModal();
      if (lang === 'ru') {
        return onSelectChange('en');
      }
      onSelectChange('ru');
    }
  };
  let isMobileLanguage = currentWidth < isMobileSize && !isEn && f.active;
  const languageForRender = (lang: string) => {
    return (
      <div
        className={
          f.container + ' ' + f.languagesContainer + ' ' + isMobileLanguage
        }
        id="isMobile"
        onClick={(e) => langHandler(lang, e)}
      >
        <Image
          alt="no-image"
          src={
            lang !== 'en'
              ? '/img/flag_united_kingdom.svg'
              : '/img/flag_russia.svg'
          }
          width={20}
          height={20}
        />
        <span>{lang === 'ru' ? 'English' : 'Русский'}</span>
      </div>
    );
  };
  return languageForRender(language);
};
