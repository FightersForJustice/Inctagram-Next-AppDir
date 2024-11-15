import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { DeleteModal } from '../DeleteModal/DeleteModal';

import s from './SubscribersModal.module.scss';
import { UserForFollowersList } from '@/components/UserForList/UserForFollowersList';
import { SelectedUser } from '@/components/Modals/ViewLikesModal/ViewLikesModal';
import {
  FollowerType,
  GetFollowersDataType,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getUserFollowers } from '@/app/(authorized)/search/SearchContent/actions';
import { useDebounce } from '@/utils/useDebaunce';
import { UnsubscribeModal } from '@/components/Modals/UnsubscribeModal';

type Props = {
  myId?: number;
  userName: string;
  followUnfollow: (userId: number, isFollowing: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
};

export const SubscribersModal = ({
  myId,
  userName,
  followUnfollow,
  setShowSubscribersModal,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    const data: GetFollowersDataType | null = await getUserFollowers(
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

  const selectUser = (
    userId: number,
    name: string,
    avatarSrc: string,
    isFollowing: boolean
  ) => {
    const avatarUrl = avatarSrc
      ? avatarSrc
      : '/img/create-post/icons/icon3.svg';
    setSelectedUser({ userId, name, isFollowing, avatarUrl });
  };

  const openUnfollowModal = (
    userId: number,
    name: string,
    avatarSrc: string,
    isFollowing: boolean
  ) => {
    selectUser(userId, name, avatarSrc, isFollowing);
    setShowUnsubscribeModal(true);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const followUnfollowHandler = async (isFollowing: boolean) => {
    await followUnfollow(selectedUser.userId, isFollowing);
    await fetchUsers();
  };

  const openDeleteFollowerModal = (
    userId: number,
    name: string,
    avatarSrc: string,
    isFollowing: boolean
  ) => {
    selectUser(userId, name, avatarSrc, isFollowing);
    setShowDeleteModal(true);
  };

  const removeFollower = () => {
    // add correct logic
    console.log('removeFollower-logic in progress');
  };

  const usersList =
    users &&
    users.map((user) => {
      const isMyProfile = myId === user.userId;

      return (
        <UserForFollowersList
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
          onDeleteSubscriber={() =>
            openDeleteFollowerModal(
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
        title={`${users.length} ${translate('SubscribersModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscribersModal(false)}
      >
        <div className={s.modal}>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            className={s.modal__input}
            placeholder={translate('SubscribersModal.search')}
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
          user={selectedUser}
          followUnfollow={followUnfollowHandler}
          setShowUnsubscribeModal={setShowUnsubscribeModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          user={selectedUser}
          removeFollower={removeFollower}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};
