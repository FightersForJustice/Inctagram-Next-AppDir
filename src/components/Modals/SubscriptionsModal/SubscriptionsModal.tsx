import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from './SubscriptionsModal.module.scss';
import { SelectedUser } from '@/components/Modals/ViewLikesModal/ViewLikesModal';
import {
  FollowerType,
  GetFollowersDataType,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { UserForFollowingList } from '@/components/UserForList/UserForFollowingList';
import { useDebounce } from '@/utils/useDebaunce';
import { getUserFollowing } from '@/app/(authorized)/search/SearchContent/actions';

type Props = {
  myId?: number;
  userName: string;
  followUnfollow: (userId: number, isFollowing: boolean) => void;
  setShowSubscriptionsModal: (value: boolean) => void;
};

export const SubscriptionsModal: React.FC<Props> = ({
  myId,
  userName,
  followUnfollow,
  setShowSubscriptionsModal,
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    userId: 0,
    name: '',
    isFollowing: false,
    avatarUrl: '/img/create-post/icons/icon3.svg',
  });

  const debouncedSearch = useDebounce(search, 1000);

  const fetchUsers = async () => {
    const data: GetFollowersDataType | null = await getUserFollowing(
      userName,
      debouncedSearch
    );
    if (data) {
      setUsers(data.items);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const followUnfollowHandler = async (isFollowing: boolean) => {
    await followUnfollow(selectedUser.userId, isFollowing);
    await fetchUsers();
  };

  const openUnfollowModal = (
    userId: number,
    name: string,
    avatarSrc: string,
    isFollowing: boolean
  ) => {
    const avatarUrl = avatarSrc
      ? avatarSrc
      : '/img/create-post/icons/icon3.svg';
    setSelectedUser({ userId, name, isFollowing, avatarUrl });
    setShowUnsubscribeModal(true);
  };

  const usersList =
    users &&
    users.map((user) => {
      const isMyProfile = myId === user.userId;

      return (
        <UserForFollowingList
          key={user.userId}
          isMyProfile={isMyProfile}
          user={user}
          translate={translate}
          setShowUnsubscribeModal={() =>
            openUnfollowModal(
              user.userId,
              user.userName,
              user.avatars[0]?.url,
              user.isFollowing
            )
          }
        />
      );
    });

  return (
    <>
      <Modal
        title={`${users.length} ${translate('SubscriptionsModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscriptionsModal(false)}
      >
        <div className={s.modal}>
          <input
            type="text"
            value={search}
            onChange={onChangeSearch}
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
        {usersList}
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
