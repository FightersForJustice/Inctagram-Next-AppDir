import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Modal } from '../Modal/Modal';
import { DeleteModal } from '../DeleteModal/DeleteModal';

import s from './SubscribersModal.module.scss';

type Props = {
  setShowSubscribersModal: (value: boolean) => void;
};

export const SubscribersModal = ({ setShowSubscribersModal }: Props) => {
  const t = useTranslations('MyProfilePage');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDeleteSubscriber = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <Modal
        title={`2 358 ${t('SubscribersModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscribersModal(false)}
      >
        <div className={s.modal}>
          <input
            type="text"
            className={s.modal__input}
            placeholder={t('SubscribersModal.search')}
          />
          <Image
            className={s.modal__icon}
            src={'/img/modal/search.svg'}
            alt={'search'}
            width={20}
            height={20}
          />
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return (
            <div key={index} className={s.modal__content}>
              <div className={s.modal__content__left}>
                <Image
                  src={'/img/modal/avatar.png'}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  className={s.modal__content__avatar}
                />
                <p>URLProfiele</p>
              </div>
              <div className={s.modal__content__right}>
                <button className={s.modal__content__subscribe}>
                  {t('SubscribersModal.subBtn')}
                </button>
                <button
                  className={s.modal__content__delete}
                  onClick={onDeleteSubscriber}
                >
                  {t('SubscribersModal.deleteBtn')}
                </button>
              </div>
            </div>
          );
        })}
      </Modal>
      {showDeleteModal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} />
      )}
    </>
  );
};
