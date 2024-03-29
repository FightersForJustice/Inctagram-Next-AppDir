import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from './SubscriptionsModal.module.scss';

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
};

export const SubscriptionsModal: React.FC<Props> = ({
  setShowSubscriptionsModal,
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  return (
    <>
      <Modal
        title={`2 218 ${translate('SubscriptionsModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscriptionsModal(false)}
      >
        <div className={s.modal}>
          <input
            type="text"
            className={s.modal__input}
            placeholder={translate('SubscriptionsModal.search')}
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
                <p>URLProfielркеркеркерокео</p>
              </div>
              <div className={s.modal__content__right}>
                <button
                  className={s.modal__content__unsubscribe}
                  onClick={() => setShowUnsubscribeModal(true)}
                >
                  {translate('SubscriptionsModal.unsubscribe')}
                </button>
              </div>
            </div>
          );
        })}
      </Modal>
      {showUnsubscribeModal && (
        <UnsubscribeModal setShowUnsubscribeModal={setShowUnsubscribeModal} />
      )}
    </>
  );
};
