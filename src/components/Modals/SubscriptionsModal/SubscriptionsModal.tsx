import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from './SubscriptionsModal.module.scss';
import { SelectedUser } from '@/components/Modals/ViewLikesModal/ViewLikesModal';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

type Props = {
  followUnfollow: (userId: number, isFollowing: boolean) => void;
  setShowSubscriptionsModal: (value: boolean) => void;
};

export const SubscriptionsModal: React.FC<Props> = ({
  followUnfollow,
  setShowSubscriptionsModal,
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    userId: 0,
    name: '',
    isFollowing: false,
    avatarUrl: '/img/create-post/icons/icon3.svg',
  });

  const fetchUsers = async () => {};

  const followUnfollowHandler = async (isFollowing: boolean) => {
    await followUnfollow(selectedUser.userId, isFollowing);
    await fetchUsers();
  };

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
        {users &&
          users.map((item, index) => {
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
        <UnsubscribeModal
          followUnfollow={followUnfollowHandler}
          user={selectedUser}
          setShowUnsubscribeModal={setShowUnsubscribeModal}
        />
      )}
    </>
  );
};
