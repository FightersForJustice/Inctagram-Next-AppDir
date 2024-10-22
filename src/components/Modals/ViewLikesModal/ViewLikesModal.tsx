import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './ViewLikesModal.module.scss';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  users: FollowerType[];
  likesAmount: number;
  setIsViewUsersList: (value: boolean) => void;
};

export const ViewLikesModal = ({
  setIsViewUsersList,
  likesAmount,
  users,
}: Props) => {
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
        {users.map((user) => {
          const avatar = user.avatars[0]
            ? user.avatars[0].url
            : '/img/create-post/icons/icon3.svg';

          return (
            <div key={user.userId} className={s.modal__content}>
              <div className={s.modal__content__left}>
                <Image
                  src={avatar}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  className={s.modal__content__avatar}
                />
                <p>{user.userName}</p>
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
