import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './UnsubscribeModal.module.scss';

type Props = {
  type: 'subscribe' | 'unsubscribe';
  userName: string;
  followUnfollow: () => void;
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal = ({
  type,
  setShowUnsubscribeModal,
  userName,
  followUnfollow,
}: Props) => {
  const { t } = useTranslation();
  const preKey = type === 'subscribe' ? 'SubscribeModal.' : 'UnsubscribeModal.';
  const translate = (key: string): string => t(`MyProfilePage.${preKey}${key}`);

  const unfollowHandler = () => {
    followUnfollow();
    setShowUnsubscribeModal(false);
  };

  return (
    <Modal
      title={translate('title')}
      isOkBtn={false}
      onClose={() => setShowUnsubscribeModal(false)}
    >
      <div className={s.deleteModal__info}>
        <Image
          src={'/img/modal/avatar.png'}
          alt={'avatar'}
          width={36}
          height={36}
          className={s.deleteModal__avatar}
        />
        <p className={s.deleteModal__text}>
          {translate('question')} <span>{userName}</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button className={s.deleteModal__btn__yes} onClick={unfollowHandler}>
          {translate('btnYes')}
        </button>
        <button
          className={s.deleteModal__btn__no}
          onClick={() => setShowUnsubscribeModal(false)}
        >
          {translate('btnNo')}
        </button>
      </div>
      {/* </div> */}
    </Modal>
  );
};
