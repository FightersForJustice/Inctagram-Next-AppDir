'use client';

import { useTranslations } from 'next-intl';

export const TranslateTextClientComponent = ({
  useTranslationsPage,
  text,
}: {
  useTranslationsPage: string;
  text: string;
}) => {
  const t = useTranslations(useTranslationsPage);

  return <>{t(text)}</>;
};
