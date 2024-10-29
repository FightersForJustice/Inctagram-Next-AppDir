import React from 'react';
import s from '@/components/Modals/SubscribersModal/SubscribersModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  user: FollowerType;
  translate: (key: string) => string;
  moveToProfile: (id: number) => void;
  openFollowUnfollowModal: (
    id: number,
    name: string,
    isFollow: boolean
  ) => void;
  onDeleteSubscriber: (name: string, id: number) => void;
};

export const UserForFollowersList: React.FC<Props> = ({
  user,
  translate,
  moveToProfile,
  openFollowUnfollowModal,
  onDeleteSubscriber,
}) => {
  const avatar = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  const btnTitle = user.isFollowing
    ? translate('SubscribersModal.unsubBtn')
    : translate('SubscribersModal.subBtn');

  const finalClassName = user.isFollowing
    ? s.modal__content__unsubscribe
    : s.modal__content__subscribe;

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
          className={finalClassName}
          onClick={() =>
            openFollowUnfollowModal(
              user.userId,
              user.userName,
              user.isFollowing
            )
          }
        >
          {btnTitle}
        </button>
        <button
          className={s.modal__content__delete}
          onClick={() => onDeleteSubscriber(user.userName, user.userId)}
        >
          {translate('SubscribersModal.deleteBtn')}
        </button>
      </div>
    </div>
  );
};
