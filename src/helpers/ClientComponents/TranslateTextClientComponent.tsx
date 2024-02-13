'use client';

import { useTranslation } from 'react-i18next';

export const TranslateTextClientComponent = ({
  useTranslationsPage,
  text,
}: {
  useTranslationsPage: string;
  text: string;
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(useTranslationsPage + `.${key}`);
  return <>{translate(text)}</>;
};
