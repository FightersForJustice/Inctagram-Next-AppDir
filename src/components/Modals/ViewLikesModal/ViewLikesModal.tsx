import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from '../SubscriptionsModal/SubscriptionsModal.module.scss';
import {
  FollowerType,
  PostLikesDataType,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import UserForLikesList from '@/components/UserForList/UserForLikesList';
import { getLikesPostId } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { useDebounce } from '@/utils/useDebaunce';

type Props = {
  myId?: number;
  postId: number;
  followUnfollow: (userId: number, isFollowing: boolean) => void;
  likes: number;
  setShowViewLikesModal: (value: boolean) => void;
};

export const ViewLikesModal: React.FC<Props> = ({
  myId,
  postId,
  setShowViewLikesModal,
  likes,
  followUnfollow,
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [search, setSearch] = useState('');
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    userId: 0,
    name: '',
    isFollowing: false,
    avatarUrl: '/img/create-post/icons/icon3.svg',
  });

  const debouncedSearch = useDebounce(search, 1000);

  const fetchUsers = async () => {
    const { items }: PostLikesDataType = await getLikesPostId(
      postId,
      debouncedSearch
    );
    setUsers(items);
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch]);

  const openFollowUnfollowModal = (
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

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const followUnfollowHandler = async (isFollowing: boolean) => {
    await followUnfollow(selectedUser.userId, isFollowing);
    await fetchUsers();
  };

  const onCloseModal = () => {
    setShowViewLikesModal(false);
  };

  const usersList =
    users &&
    users.map((user) => {
      return (
        <UserForLikesList
          key={user.userId}
          user={user}
          isMyProfile={myId === user.userId}
          translate={translate}
          setShowUnsubscribeModal={() =>
            openFollowUnfollowModal(
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
        title={`${likes} ${translate('LikesModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={onCloseModal}
      >
        <div className={s.modal}>
          <input
            type="text"
            value={search}
            onChange={onChangeSearch}
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

export type SelectedUser = {
  userId: number;
  isFollowing: boolean;
  name: string;
  avatarUrl: string;
};
