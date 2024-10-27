import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { UnsubscribeModal } from '../UnsubscribeModal/UnsubscribeModal';

import s from './SubscriptionsModal.module.scss';
import {
  getUserFollowing,
  unfollowByUser,
} from '@/app/(authorized)/search/SearchContent/data';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useDebounce } from '@/utils/useDebaunce';

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
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<{ name: string; id: number }>({
    name: '',
    id: 0,
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

  const openUnfollowModal = (name: string, id: number) => {
    setCurrentUser({ name, id });
    setShowUnsubscribeModal(true);
  };

  const unfollowHandler = async () => {
    await unfollowByUser(currentUser.id, token);
    await getUsers();
  };

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
                <button
                  className={s.modal__content__unsubscribe}
                  onClick={() => openUnfollowModal(user.userName, user.userId)}
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
          userName={currentUser.name}
          unfollow={unfollowHandler}
          setShowUnsubscribeModal={setShowUnsubscribeModal}
        />
      )}
    </>
  );
};
