'use client';

import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import s from './SubscriptionsProfile.module.scss';

export const SubscriptionsProfile = ({
  userPostsLength,
  setShowSubscriptionsModal,
  setShowSubscribersModal,
}: {
  userPostsLength: number | undefined;
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
}) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  return (
    <div className={s.profileInfoContainer}>
      <div className={s.profileInfo}>
        <div
          className={s.profileInfoSubscriptions}
          onClick={() => setShowSubscriptionsModal(true)}
        >
          <p>0</p>
          <p>{t('subscriptions')}</p>
        </div>
        <div
          className={s.profileInfoSubscribers}
          onClick={() => setShowSubscribersModal(true)}
        >
          <p>0</p>
          <p>{t('subscribers')}</p>
        </div>
        <div className={s.profileInfoPublications}>
          <p>{userPostsLength ?? 0}</p>
          <p>{t('publications')}</p>
        </div>
      </div>
    </div>
  );
};
