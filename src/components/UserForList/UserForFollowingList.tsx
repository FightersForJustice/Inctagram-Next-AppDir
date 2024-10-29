import React from 'react';
import s from '@/components/Modals/SubscriptionsModal/SubscriptionsModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  user: FollowerType;
  moveToProfile: (id: number) => void;
  translate: (key: string) => string;
  openUnfollowModal: (name: string, id: number, isFollow: boolean) => void;
};

export const UserForFollowingList: React.FC<Props> = ({
  user,
  openUnfollowModal,
  translate,
  moveToProfile,
}) => {
  const avatar = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  return (
    <div key={user.userId} className={s.modal__content}>
      <div
        onClick={() => moveToProfile(user.userId)}
        className={s.modal__content__left}
      >
        <Image
          src={avatar}
          alt={'avatar'}
          width={36}
          height={36}
          className={s.modal__content__avatar}
        />
        <p>{user.userName}</p>
      </div>
      <div className={s.modal__content__right}>
        <button
          className={s.modal__content__unsubscribe}
          onClick={() =>
            openUnfollowModal(user.userName, user.userId, user.isFollowing)
          }
        >
          {translate('SubscriptionsModal.unsubscribe')}
        </button>
      </div>
    </div>
  );
};
