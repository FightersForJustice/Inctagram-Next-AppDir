import { TranslationSelect } from './TranslationSelect';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next-intl/client';
import { useState, useTransition } from 'react';

export const HeaderTranslation = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (value: string) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const onSelectChange = function (value: string) {
    setLanguage(value);
    startTransition(() => {
      router.replace(`/${value}${pathname}`);
    });
  };
  return (
    <>
      <TranslationSelect onSelectChange={onSelectChange} language={language} />
    </>
  );
};
