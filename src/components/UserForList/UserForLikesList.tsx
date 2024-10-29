import React from 'react';
import s from '@/components/Modals/ViewLikesModal/ViewLikesModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  user: FollowerType;
  translate: (key: string) => string;
  setCurrentUser: React.Dispatch<{ name: string; id: number }>;
  setShowSubscribeModal: React.Dispatch<boolean>;
  moveToProfile: (id: number) => void;
};

export const UserForLikesList: React.FC<Props> = ({
  user,
  translate,
  setCurrentUser,
  setShowSubscribeModal,
  moveToProfile,
}) => {
  const avatar = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  const btnTitle = user.isFollowing
    ? translate('LikesModal.unsubBtn')
    : translate('LikesModal.subBtn');

  const finalClassName = user.isFollowing
    ? s.modal__content__unsubscribe
    : s.modal__content__subscribe;

  const openSubscribeModal = (name: string, id: number) => {
    setCurrentUser({ name, id });
    setShowSubscribeModal(true);
  };

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
          onClick={() => openSubscribeModal(user.userName, user.userId)}
          className={finalClassName}
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
};
