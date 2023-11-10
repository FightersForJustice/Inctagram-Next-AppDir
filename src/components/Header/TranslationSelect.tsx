import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import s from '@/app/[locale]/my-profile/CreatePost/CreatePost.module.scss';
import Image from 'next/image';
import { LanguagesModal } from '@/components/Header/LanguagesModal';

export const TranslationSelect = ({
  language,
  onSelectChange,
}: {
  language: string;
  onSelectChange: (value: string) => void;
}) => {
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const returnLanguageFullName = (language: string) => {
    const fullNamesLanguages = {
      ru: 'Russian',
      en: 'English',
    };
    return fullNamesLanguages[language as 'ru' | 'en'];
  };
  return (
    <>
      <Popover.Root onOpenChange={() => setOpenChangeSize(!openChangeSize)}>
        <div className={s.cropping__wrapper}>
          <Popover.Trigger
            className={
              'cursor-pointer flex items-center justify-between border-1 border-[--dark-100] w-[163px] px-[12px] py-[6px]'
            }
          >
            <div className="flex items-center justify-left gap-2">
              <Image
                alt="no-image"
                src={
                  language === 'ru'
                    ? '/img/flag_russia.svg'
                    : '/img/flag_united_kingdom.svg'
                }
                width={20}
                height={20}
              />
              <span>{returnLanguageFullName(language)}</span>
            </div>
            <Image
              alt="no-image"
              src="/img/arrowDown-light.svg"
              width={20}
              height={20}
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="PopoverContent z-30" sideOffset={5}>
              <LanguagesModal
                setLanguage={returnLanguageFullName}
                onSelectChange={onSelectChange}
                language={language}
              />
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    </>
  );
};
