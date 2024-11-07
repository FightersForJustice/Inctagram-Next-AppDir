import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './UnsubscribeModal.module.scss';
import { SelectedUser } from '@/components/Modals/ViewLikesModal/ViewLikesModal';

type Props = {
  followUnfollow: (isFollowing: boolean) => void;
  user: SelectedUser;
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal = ({
  setShowUnsubscribeModal,
  user,
  followUnfollow,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const { name, avatarUrl, isFollowing } = user;

  const btnName = translate(
    isFollowing ? 'UnsubscribeModal.question' : 'SubscribeModal.question'
  );

  const title = translate(
    isFollowing ? 'UnsubscribeModal.title' : 'SubscribeModal.title'
  );

  const followUnfollowHandler = () => {
    followUnfollow(isFollowing);
    setShowUnsubscribeModal(false);
  };

  return (
    <Modal
      title={title}
      isOkBtn={false}
      onClose={() => setShowUnsubscribeModal(false)}
    >
      <div className={s.deleteModal__info}>
        <Image
          src={avatarUrl}
          alt={'avatar'}
          width={36}
          height={36}
          className={s.deleteModal__avatar}
        />
        <p className={s.deleteModal__text}>
          {btnName} <span>{name}</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button
          onClick={followUnfollowHandler}
          className={s.deleteModal__btn__yes}
        >
          {translate('UnsubscribeModal.btnYes')}
        </button>
        <button
          className={s.deleteModal__btn__no}
          onClick={() => setShowUnsubscribeModal(false)}
        >
          {translate('UnsubscribeModal.btnNo')}
        </button>
      </div>
    </Modal>
  );
};
