import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './ViewLikesModal.module.scss';

type Props = {
  likesAmount: number;
  setIsViewUsersList: (value: boolean) => void;
};

export const ViewLikesModal = ({ setIsViewUsersList, likesAmount }: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  return (
    <>
      <Modal
        title={`${likesAmount} ${translate('LikesModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setIsViewUsersList(false)}
      >
        <div className={s.modal}>
          <input
            type="text"
            className={s.modal__input}
            placeholder={translate('LikesModal.search')}
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
                  {translate('LikesModal.subBtn')}
                </button>
              </div>
            </div>
          );
        })}
      </Modal>
    </>
  );
};
