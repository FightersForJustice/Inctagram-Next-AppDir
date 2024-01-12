'use client';
import Link from 'next/link';
import s from './MyProfile.module.scss';
import { ApiResponsePosts, UserProfile } from './types';
import { useState } from 'react';
import { SubscribersModal } from '@/components/Modals/SubscribersModal';
import { SubscriptionsModal } from '@/components/Modals/SubscriptionsModal';
import Image from 'next/image';

type Props = {
  data: UserProfile;
  postsData: ApiResponsePosts;
  myProfile: boolean;
};

export const ProfileWrapper = ({ data, postsData, myProfile }: Props) => {
  const paidAccount = true;

  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);

  return (
    <div className={s.profile__wrapper}>
      <div className={s.profile__title}>
        <div className={s.profile__title__wrapper}>
          <p id={'profile-userName'}>{data?.userName ?? 'User Name'}</p>
          {paidAccount && (
            <Image width={24} height={24} src="/img/paidAccount.svg" alt="" />
          )}
        </div>
        {myProfile ? (
          <Link
            href={'/settings-profile'}
            className={s.profile__btn}
            id={'profile-link-to-settings-profile'}
          >
            Profile Settings
          </Link>
        ) : (
          <div className={s.listBtn}>
            <Link href="#" className={s.btnPrimary}>
              Follow
            </Link>
            <Link href="#" className={s.profile__btn}>
              Send Message
            </Link>
          </div>
        )}
      </div>
      <div className={s.profile__info}>
        <div
          className={s.profile__info__subscriptions}
          onClick={() => setShowSubscriptionsModal(true)}
        >
          <p>0</p>
          <p>Following</p>
        </div>
        <div
          className={s.profile__info__subscribers}
          onClick={() => setShowSubscribersModal(true)}
        >
          <p>0</p>
          <p>Followers</p>
        </div>
        <div className={s.profile__info__publications}>
          <p>{postsData.totalCount}</p>
          <p>Publications</p>
        </div>
      </div>
      <p className={s.profile__desc} id={'profile-aboutMe'}>
        {data?.aboutMe ??
          "Fill in the information about yourself, it's empty now 👁️"}
      </p>
      {showSubscribersModal && (
        <SubscribersModal setShowSubscribersModal={setShowSubscribersModal} />
      )}
      {showSubscriptionsModal && (
        <SubscriptionsModal
          setShowSubscriptionsModal={setShowSubscriptionsModal}
        />
      )}
    </div>
  );
};
