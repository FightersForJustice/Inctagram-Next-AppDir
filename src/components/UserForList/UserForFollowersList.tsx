import React from 'react';
import s from '@/components/Modals/SubscriptionsModal/SubscriptionsModal.module.scss';
import Image from 'next/image';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useRouter } from 'next/navigation';

type Props = {
  isMyProfile: boolean;
  showDeleteBtn: boolean;
  user: FollowerType;
  translate: (key: string) => string;
  setShowUnsubscribeModal: React.Dispatch<boolean>;
  onDeleteSubscriber: () => void;
};

export const UserForFollowersList: React.FC<Props> = ({
  isMyProfile,
  showDeleteBtn,
  user,
  translate,
  setShowUnsubscribeModal,
  onDeleteSubscriber,
}) => {
  const router = useRouter();

  const avatarSrc = user.avatars[0]
    ? user.avatars[0].url
    : '/img/create-post/icons/icon3.svg';

  const btnName = translate(
    user.isFollowing
      ? 'SubscribersModal.unsubscribe'
      : 'SubscribersModal.subscribe'
  );

  const finalClassName = user.isFollowing
    ? s.modal__content__unsubscribe
    : s.modal__content__subscribe;

  const openFollowUnfollowModal = () => {
    setShowUnsubscribeModal(true);
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
      {!isMyProfile && (
        <div className={s.modal__content__right}>
          <button onClick={openFollowUnfollowModal} className={finalClassName}>
            {btnName}
          </button>
          {showDeleteBtn && (
            <button
              className={s.modal__content__delete}
              onClick={onDeleteSubscriber}
            >
              {translate('SubscribersModal.deleteBtn')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
