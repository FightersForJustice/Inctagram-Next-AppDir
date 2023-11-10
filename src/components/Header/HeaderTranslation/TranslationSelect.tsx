import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import s from '@/app/[locale]/my-profile/CreatePost/CreatePost.module.scss';
import Image from 'next/image';
import { LanguagesModal } from './LanguagesModal';

export const TranslationSelect = ({
  language,
  onSelectChange,
}: {
  language: string;
  onSelectChange: (value: string) => void;
}) => {
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const fullLanguages: any = {
    ru: { name: 'Russian', img: '/img/flag_russia.svg' },
    en: { name: 'English', img: '/img/flag_united_kingdom.svg' },
  };
  const onSelectChange1 = (value: string) => {
    onSelectChange(value);
  };

  return (
    <Popover.Root
      open={openChangeSize}
      onOpenChange={() => setOpenChangeSize(!openChangeSize)}
    >
      <div className={s.cropping__wrapper}>
        <Popover.Trigger
          className={
            'cursor-pointer flex items-center justify-between border-1 border-[--dark-100] w-[163px] px-[12px] py-[6px]'
          }
        >
          <div className="flex items-center justify-left gap-2">
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
          <Popover.Content className="PopoverContent z-30" forceMount={true}>
            <LanguagesModal
              closeModal={() => setOpenChangeSize(false)}
              onSelectChange={onSelectChange1}
              language={language}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
