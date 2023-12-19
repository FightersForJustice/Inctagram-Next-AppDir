import React from 'react';
import Image from 'next/image';
import { Modal } from '../Modal/Modal';
import { useTranslations } from 'next-intl';

import s from './UnsubscribeModal.module.scss';

type Props = {
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal: React.FC<Props> = ({
  setShowUnsubscribeModal,
}) => {
  const t = useTranslations('MyProfilePage');

  return (
    <Modal
      title={t('UnsubscribeModal.title')}
      isOkBtn={false}
      onClose={() => setShowUnsubscribeModal(false)}
    >
      {/* <div className={s.deleteModal}> */}
        <div className={s.deleteModal__info}>
          <Image
            src={'/img/modal/avatar.png'}
            alt={'avatar'}
            width={36}
            height={36}
            className={s.deleteModal__avatar}
          />
          <p className={s.deleteModal__text}>
            {t('UnsubscribeModal.question')} <span>“URLProfiele”</span>?
          </p>
        </div>
        <div className={s.deleteModal__wrapper}>
          <button className={s.deleteModal__btn__yes}>
            {t('UnsubscribeModal.btnYes')}
          </button>
          <button
            className={s.deleteModal__btn__no}
            onClick={() => setShowUnsubscribeModal(false)}
          >
            {t('UnsubscribeModal.btnNo')}
          </button>
        </div>
      {/* </div> */}
    </Modal>
  );
};
