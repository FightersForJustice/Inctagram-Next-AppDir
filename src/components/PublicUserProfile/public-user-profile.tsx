'use client';

import React from 'react';
import s from '@/app/(authorized)/profile/[id]/ProfileInfo/ProfileInfo.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { PublicProfileType } from '@/api/public-profile.api';
import { PostItem } from '@/api/public-post.api';

type Props = {
  publicUserData: PublicProfileType;
  publicPostData: PostItem;
};

const PublicUserProfile = ({publicUserData, publicPostData}: Props) => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`MyProfilePage.${key}`)
  return (
    <>
      <div className={s.profile}>
        <div className={s.left}>
          <Image
            src={
              publicUserData?.avatars[0]
                ? publicUserData.avatars[0].url
                : '/img/create-post/no-image.png'
            }
            alt="avatar"
            width={204}
            height={204}
            className={s.avatar}
          />
        </div>
        <div className={s.right}>
          <div className={s.info}>
            <div className={s.top}>
              <div className={s.blockUser}>
                <div className={s.name}>{publicUserData?.userName}</div>
                <div className={s.statistics}>
                  <div>
                    <p>0</p>
                    <p>{translate('subscriptions')}</p>
                  </div>
                  <div>
                    <p>0</p>
                    <p>{translate('subscribers')}</p>
                  </div>
                  <div>
                    {/*<p>{publicPostData.totalCount}</p>*/}
                    <p>{translate('publications')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.descriptionsPublic}>
              {publicUserData?.aboutMe ?? translate('aboutMe')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicUserProfile;