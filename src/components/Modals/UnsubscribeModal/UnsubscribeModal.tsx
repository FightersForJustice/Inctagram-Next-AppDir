import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './UnsubscribeModal.module.scss';

type Props = {
  userName: string;
  unfollow: () => void;
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal = ({
  setShowUnsubscribeModal,
  userName,
  unfollow,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const unfollowHandler = () => {
    unfollow();
    setShowUnsubscribeModal(false);
  };

  return (
    <Modal
      title={translate('UnsubscribeModal.title')}
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
          {translate('UnsubscribeModal.question')} <span>{userName}</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button className={s.deleteModal__btn__yes} onClick={unfollowHandler}>
          {translate('UnsubscribeModal.btnYes')}
        </button>
        <button
          className={s.deleteModal__btn__no}
          onClick={() => setShowUnsubscribeModal(false)}
        >
          {translate('UnsubscribeModal.btnNo')}
        </button>
      </div>
      {/* </div> */}
    </Modal>
  );
};
