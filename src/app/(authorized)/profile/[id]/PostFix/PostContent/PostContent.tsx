import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { PostComment } from './PostComment';
import { PostLikes } from './PostLikes';

import s from './PostContent.module.scss';

type Props = {
  avatar: string;
  userName: string;
  description: string;
  setVisiblePopup: (value: boolean) => void;
  showAreYouSureModal: boolean;
  setShowAreYouSureModal: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContent = ({
  description,
  userName,
  avatar,
  setVisiblePopup,
  showAreYouSureModal,
  setShowAreYouSureModal,
  onDeletePost,
}: Props) => {
  return (
    <>
      <div className={s.post__desc}>
        <Image
          src={avatar ?? '/img/create-post/no-image.png'}
          alt={'ava'}
          width={36}
          height={36}
          className={s.post__avatar}
        />
        <div>
          <p className={s.post__desc__text}>
            <span className={s.post__desc__name}>{userName} </span>
            {description}
          </p>
          <p className={s.post__desc__time}>2 hours ago</p>
        </div>
      </div>
      <PostComment />
      <PostComment />
      <PostLikes />
      {showAreYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setShowAreYouSureModal}
          toggleModal={setVisiblePopup}
          onDelete={onDeletePost}
        />
      )}
    </>
  );
};
