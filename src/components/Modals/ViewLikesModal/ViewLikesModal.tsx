import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './ViewLikesModal.module.scss';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import {
  followToUser,
  unfollowByUser,
} from '@/app/(authorized)/search/SearchContent/data';

type Props = {
  users?: FollowerType[];
  likesAmount: number;
  setIsViewUsersList: (value: boolean) => void;
  token: string | null;
  myProfile: boolean;
};

export const ViewLikesModal = ({
  setIsViewUsersList,
  likesAmount,
  users,
  token,
  myProfile,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);

  const usersList =
    users &&
    users.map((user) => {
      const avatar = user.avatars[0]
        ? user.avatars[0].url
        : '/img/create-post/icons/icon3.svg';

      const btnTitle = user.isFollowing
        ? translate('LikesModal.subBtn')
        : translate('LikesModal.unsubBtn');

      const finalClassName = user.isFollowing
        ? s.modal__content__unsubscribe
        : s.modal__content__subscribe;

      const followUnfollowHandler = async () => {
        if (user.isFollowing) {
          await unfollowByUser(user.userId, token);
        } else {
          await followToUser(user.userId, token);
        }
      };

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
          {!myProfile && (
            <div className={s.modal__content__right}>
              <button
                onClick={followUnfollowHandler}
                className={finalClassName}
              >
                {btnTitle}
              </button>
            </div>
          )}
        </div>
      );
    });

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
        {usersList}
      </Modal>
    </>
  );
};
