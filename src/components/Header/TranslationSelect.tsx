import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import s from "@/app/[locale]/my-profile/CreatePost/CreatePost.module.scss";
import Image from "next/image";
import { LanguagesModal } from "@/components/Header/LanguagesModal";

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
      ru: "Russian",
      en: "English",
    };
    return fullNamesLanguages[language as "ru" | "en"];
  };
  return (
    <>
      <Popover.Root onOpenChange={() => setOpenChangeSize(!openChangeSize)}>
        <div className={s.cropping__wrapper}>
          <Popover.Trigger
            className={
              "cursor-pointer gap-2 flex items-center border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[20px]"
            }
          >
            <span>{returnLanguageFullName(language)}</span>
            <Image alt={"no-image"} src={"/img/arrowDown-light.png"} width={10} height={10} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="PopoverContent z-30" sideOffset={5}>
              <LanguagesModal setLanguage={returnLanguageFullName} onSelectChange={onSelectChange} />
            </Popover.Content>
          </Popover.Portal>
        </div>
      </Popover.Root>
    </>
  );
};
