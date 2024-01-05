'use client';

import { NotFound } from '@/components/NotFound';
import { useTranslation } from 'react-i18next';

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
