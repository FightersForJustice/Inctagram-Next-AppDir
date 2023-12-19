import Image from 'next/image';
import { Modal } from '../Modal/Modal';
import { useTranslations } from 'next-intl';

import s from './DeleteAvatarModal.module.scss';

type Props = {
  setShowModal: (value: boolean) => void;
  onClose: () => void;
  userAvatar: string;
};

export const DeleteAvatarModal = ({
  setShowModal,
  onClose,
  userAvatar,
}: Props) => {
  const t = useTranslations('MyProfilePage');
  const closeHandler = (value: boolean) => {
    if (value) {
      onClose();
    }
    setShowModal(false);
  };

  return (
    userAvatar && (
      <Modal
        title={t('DeleteAvatarModal.title')}
        isOkBtn={false}
        onClose={() => closeHandler(false)}
        className={s.container}
      >
        <div className={s.deleteModal__info}>
          <p className={s.deleteModal__text}>
            {t('DeleteAvatarModal.question')}?
          </p>
        </div>
        <div className={s.deleteModal__wrapper}>
          <button
            className={s.deleteModal__btn__yes}
            onClick={() => closeHandler(true)}
          >
            {t('DeleteAvatarModal.btnYes')}
          </button>
          <button
            className={s.deleteModal__btn__no}
            onClick={() => closeHandler(false)}
          >
            {t('DeleteAvatarModal.btnNo')}
          </button>
        </div>
      </Modal>
    )
  );
};
