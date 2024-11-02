import Image from 'next/image';
import { Modal } from '../Modal/Modal';
import { useTranslation } from 'react-i18next';

import s from './DeleteModal.module.scss';
import { SelectedUser } from '@/components/Modals/ViewLikesModal/ViewLikesModal';

type Props = {
  user: SelectedUser;
  removeFollower: () => void;
  setShowDeleteModal: (value: boolean) => void;
};

export const DeleteModal = ({
  setShowDeleteModal,
  user,
  removeFollower,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const { name, avatarUrl } = user;

  const onDeleteFollower = () => {
    removeFollower();
    setShowDeleteModal(false);
  };

  return (
    <Modal
      title={translate('DeleteModal.title')}
      isOkBtn={false}
      onClose={() => setShowDeleteModal(false)}
      className={s.container}
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
          {translate('DeleteModal.question')} <span>{name}</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button className={s.deleteModal__btn__yes} onClick={onDeleteFollower}>
          {translate('DeleteModal.btnYes')}
        </button>
        <button
          className={s.deleteModal__btn__no}
          onClick={() => setShowDeleteModal(false)}
        >
          {translate('DeleteModal.btnNo')}
        </button>
      </div>
    </Modal>
  );
};
