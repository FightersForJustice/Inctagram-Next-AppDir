import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { DeleteModal } from '../DeleteModal/DeleteModal';

import s from './SubscribersModal.module.scss';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import {
  followToUser,
  getUserFollowers,
  removeFollowerFromFollowers,
} from '@/app/(authorized)/search/SearchContent/data';
import { useDebounce } from '@/utils/useDebaunce';
import { useRouter } from 'next/navigation';
import { UserForFollowersList } from '@/components/UserForList';
import { UnsubscribeModal } from '@/components/Modals/UnsubscribeModal';

type Props = {
  userName: string;
  token: string | null;
  followersCount: number;
  setShowSubscribersModal: (value: boolean) => void;
};

export const SubscribersModal = ({
  setShowSubscribersModal,
  userName,
  token,
  followersCount,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [search, setSearch] = useState('');
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    id: number;
  }>({
    name: '',
    id: 0,
  });

  const debouncedSearch = useDebounce(search, 1000);

  const getUsers = async () => {
    const data = await getUserFollowers(token, {
      userName: userName,
      search: debouncedSearch,
    });
    if (data) {
      setUsers(data.items);
    }
  };

  useEffect(() => {
    getUsers();
  }, [debouncedSearch]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const openFollowUnfollowModal = (
    id: number,
    name: string,
    isFollow: boolean
  ) => {
    if (isFollow) {
      setShowUnfollowModal(true);
    } else {
      setShowFollowModal(true);
    }
    setCurrentUser({ name, id });
  };

  const followUnfollowHandler = async () => {
    await followToUser(currentUser.id, token);
  };

  const moveToProfile = (userId: number) => {
    router.push(`${userId}`);
  };

  const onDeleteSubscriber = (name: string, id: number) => {
    setCurrentUser({ name, id });
    setShowDeleteModal(true);
  };

  const removeFollower = async () => {
    await removeFollowerFromFollowers(currentUser.id, token);
    await getUsers();
  };

  const usersList = users.map((user) => {
    return (
      <UserForFollowersList
        key={user.userId}
        user={user}
        translate={translate}
        moveToProfile={moveToProfile}
        onDeleteSubscriber={onDeleteSubscriber}
        openFollowUnfollowModal={openFollowUnfollowModal}
      />
    );
  });

  return (
    <>
      <Modal
        title={`${followersCount} ${translate('SubscribersModal.title')}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscribersModal(false)}
      >
        <div className={s.modal}>
          <input
            onChange={inputChangeHandler}
            type="text"
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
      {showDeleteModal && (
        <DeleteModal
          removeFollower={removeFollower}
          userName={currentUser.name}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showFollowModal && (
        <UnsubscribeModal
          type={'subscribe'}
          userName={currentUser.name}
          setShowUnsubscribeModal={setShowFollowModal}
          followUnfollow={followUnfollowHandler}
        />
      )}
      {showUnfollowModal && (
        <UnsubscribeModal
          type={'unsubscribe'}
          userName={currentUser.name}
          setShowUnsubscribeModal={setShowUnfollowModal}
          followUnfollow={followUnfollowHandler}
        />
      )}
    </>
  );
};
