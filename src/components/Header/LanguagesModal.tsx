import React from "react";

export const LanguagesModal = ({
  setLanguage,
  onSelectChange,
}: {
  setLanguage: (language: string) => void;
  onSelectChange: (value: string) => void;
}) => {
  const onChangeSelectOption = (language: string) => {
    setLanguage(language);
    onSelectChange(language);
  };
  return (
    <div>
      <div
        className={"cursor-pointer border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[24px] bg-black"}
        onClick={() => onChangeSelectOption("en")}
      >
        English
      </div>
      <div
        className={"cursor-pointer border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[24px] bg-black"}
        onClick={() => onChangeSelectOption("ru")}
      >
        Russian
      </div>
    </div>
  );
};
