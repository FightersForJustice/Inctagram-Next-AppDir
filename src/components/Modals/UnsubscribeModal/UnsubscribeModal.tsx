import Image from 'next/image';
import { Modal } from '../Modal/Modal';

import s from './UnsubscribeModal.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal = ({ setShowUnsubscribeModal }: Props) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  return (
    <Modal
      title={translate('UnsubscribeModal.title')}
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
          {translate('UnsubscribeModal.question')} <span>“URLProfiele”</span>?
        </p>
      </div>
      <div className={s.deleteModal__wrapper}>
        <button className={s.deleteModal__btn__yes}>
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
