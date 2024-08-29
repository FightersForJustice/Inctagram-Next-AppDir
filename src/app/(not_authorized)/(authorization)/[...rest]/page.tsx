'use client';

import { useTranslation } from 'react-i18next';
import { NotFound } from '@/components/NotFound';

export default function CatchAllPage() {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`NotFoundPage.${key}`);
  return (
    <NotFound>
      <>{translate('title')}</>
      <>{translate('description')}</>
    </NotFound>
  );
}
