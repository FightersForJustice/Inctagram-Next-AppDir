import Image from 'next/image';
import { Modal } from '../Modal/Modal';

import s from './DeleteModal.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  setShowDeleteModal: (value: boolean) => void;
};

export const DeleteModal = ({ setShowDeleteModal }: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  return (
    <Modal
      title={translate('DeleteModal.title')}
      isOkBtn={false}
      onClose={() => setShowDeleteModal(false)}
      className={s.container}
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
          {translate('DeleteModal.question')} <span>“URLProfiele”</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button className={s.deleteModal__btn__yes}>
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
