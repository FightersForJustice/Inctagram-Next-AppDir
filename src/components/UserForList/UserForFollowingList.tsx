import React from 'react';
import s from '@/components/Modals/SubscriptionsModal/SubscriptionsModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useRouter } from 'next/navigation';

type Props = {
  user: FollowerType;
  translate: (key: string) => string;
  setShowUnsubscribeModal: () => void;
};

export const UserForFollowingList: React.FC<Props> = ({
  user,
  translate,
  setShowUnsubscribeModal,
}) => {
  const router = useRouter();

  const avatarSrc = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  const btnName = translate(
    user.isFollowing
      ? 'SubscriptionsModal.unsubscribe'
      : 'SubscriptionsModal.subscribe'
  );

  const finalClassName = user.isFollowing
    ? s.modal__content__unsubscribe
    : s.modal__content__subscribe;

  const openFollowUnfollowModal = () => {
    setShowUnsubscribeModal();
  };

  const goToProfile = () => {
    router.push(`${user.userId}`);
  };

  return (
    <div className={s.modal__content}>
      <div onClick={goToProfile} className={s.modal__content__left}>
        <Image
          src={avatarSrc}
          alt={'avatar'}
          width={36}
          height={36}
          className={s.modal__content__avatar}
        />
        <p>{user.userName}</p>
      </div>
      <div className={s.modal__content__right}>
        <button className={finalClassName} onClick={openFollowUnfollowModal}>
          {btnName}
        </button>
      </div>
    </div>
  );
};
