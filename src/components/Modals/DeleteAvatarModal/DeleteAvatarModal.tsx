import { Modal } from '../Modal/Modal';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const closeHandler = (value: boolean) => {
    if (value) {
      onClose();
    }
    setShowModal(false);
  };

  return (
    userAvatar && (
      <Modal
        title={translate('DeleteAvatarModal.title')}
        isOkBtn={false}
        onClose={() => closeHandler(false)}
        className={s.container}
      >
        <div className={s.deleteModal__info}>
          <p className={s.deleteModal__text}>
            {translate('DeleteAvatarModal.question')}?
          </p>
        </div>
        <div className={s.deleteModal__wrapper}>
          <button
            className={s.deleteModal__btn__yes}
            onClick={() => closeHandler(true)}
          >
            {translate('DeleteAvatarModal.btnYes')}
          </button>
          <button
            className={s.deleteModal__btn__no}
            onClick={() => closeHandler(false)}
          >
            {translate('DeleteAvatarModal.btnNo')}
          </button>
        </div>
      </Modal>
    )
  );
};
