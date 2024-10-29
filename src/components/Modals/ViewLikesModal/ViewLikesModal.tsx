import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';

import s from './ViewLikesModal.module.scss';
import { FollowerType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { followToUser } from '@/app/(authorized)/search/SearchContent/data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UnsubscribeModal } from '@/components/Modals/UnsubscribeModal';
import { UserForLikesList } from '@/components/UserForList';

type Props = {
  users?: FollowerType[];
  likesAmount: number;
  setIsViewUsersList: (value: boolean) => void;
  token: string | null;
};

export const ViewLikesModal = ({
  setIsViewUsersList,
  likesAmount,
  users,
  token,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`MyProfilePage.${key}`);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    id: number;
  }>({
    name: '',
    id: 0,
  });

  const moveToProfile = (userId: number) => {
    router.push(`${userId}`);
  };

  const followUnfollowHandler = async () => {
    await followToUser(currentUser.id, token);
  };

  const usersList =
    users &&
    users.map((user) => {
      return (
        <UserForLikesList
          user={user}
          key={user.userId}
          setCurrentUser={setCurrentUser}
          moveToProfile={moveToProfile}
          setShowSubscribeModal={setShowSubscribeModal}
          translate={translate}
        />
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
        {showSubscribeModal && (
          <UnsubscribeModal
            type={'unsubscribe'}
            userName={currentUser.name}
            followUnfollow={followUnfollowHandler}
            setShowUnsubscribeModal={setShowSubscribeModal}
          />
        )}
      </Modal>
    </>
  );
};
