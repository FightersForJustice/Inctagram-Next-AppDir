import React, { useEffect, useState } from 'react';
import s from '@/components/Modals/SubscriptionsModal/SubscriptionsModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  isMyProfile: boolean;
  user: FollowerType;
  setShowUnsubscribeModal: React.Dispatch<boolean>;
  translate: (key: string) => string;
};

const UserForLikesList: React.FC<Props> = ({
  isMyProfile,
  user,
  translate,
  setShowUnsubscribeModal,
}) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  useEffect(() => {
    setIsFollowing(user.isFollowing);
  }, [user.isFollowing]);

  const avatarSrc = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  const btnName = translate(
    isFollowing ? 'LikesModal.unsubscribe' : 'LikesModal.subscribe'
  );

  const finalClassName = isFollowing
    ? s.modal__content__unsubscribe
    : s.modal__content__subscribe;

  const openUnsubscribeModal = () => {
    setShowUnsubscribeModal(true);
  };

  return (
    <div key={user.userId} className={s.modal__content}>
      <div className={s.modal__content__left}>
        <Image
          src={avatarSrc}
          alt={'avatar'}
          width={36}
          height={36}
          className={s.modal__content__avatar}
        />
        <p>{user.userName}</p>
      </div>
      {!isMyProfile && (
        <div className={s.modal__content__right}>
          <button className={finalClassName} onClick={openUnsubscribeModal}>
            {btnName}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForLikesList;
