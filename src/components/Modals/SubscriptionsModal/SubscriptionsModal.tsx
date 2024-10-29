import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from './SubscriptionsModal.module.scss';
import {
  followToUser,
  getUserFollowing,
} from '@/app/(authorized)/search/SearchContent/data';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useDebounce } from '@/utils/useDebaunce';
import { useRouter } from 'next/navigation';
import { UserForFollowingList } from '@/components/UserForList';

type Props = {
  token: string | null;
  userName: string;
  setShowSubscriptionsModal: (value: boolean) => void;
  followingCount: number | undefined;
};

export const SubscriptionsModal: React.FC<Props> = ({
  setShowSubscriptionsModal,
  token,
  userName,
  followingCount,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    id: number;
    isFollow: boolean;
  }>({
    name: '',
    id: 0,
    isFollow: false,
  });

  const debouncedSearch = useDebounce(search, 1000);

  const getUsers = async () => {
    const data = await getUserFollowing(token, {
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

  const openUnfollowModal = (name: string, id: number, isFollow: boolean) => {
    setCurrentUser({ name, id, isFollow });
    setShowUnsubscribeModal(true);
  };

  const unfollowHandler = async () => {
    await followToUser(currentUser.id, token);
    await getUsers();
  };

  const moveToProfile = (userId: number) => {
    router.push(`${userId}`);
  };

  const usersList = users.map((user) => {
    return (
      <UserForFollowingList
        key={user.userId}
        user={user}
        moveToProfile={moveToProfile}
        translate={translate}
        openUnfollowModal={openUnfollowModal}
      />
    );
  });

  return (
    <>
      <Modal
        title={`${followingCount || 0} ${translate(
          'SubscriptionsModal.title'
        )}`}
        isOkBtn={false}
        className={s.modalClassName}
        onClose={() => setShowSubscriptionsModal(false)}
      >
        <div className={s.modal}>
          <input
            onChange={inputChangeHandler}
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
        {usersList}
      </Modal>
      {showUnsubscribeModal && (
        <UnsubscribeModal
          type={currentUser.isFollow ? 'unsubscribe' : 'subscribe'}
          userName={currentUser.name}
          followUnfollow={unfollowHandler}
          setShowUnsubscribeModal={setShowUnsubscribeModal}
        />
      )}
    </>
  );
};
