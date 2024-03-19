import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { PostComment } from './PostComment';
import { PostLikes } from './PostLikes';

import s from './PostContent.module.scss';
import { Dots } from '@/app/(authorized)/profile/[id]/PostFix/Dots';
import { DotsFriends } from '@/app/(authorized)/profile/[id]/PostFix/DotsFriends';
import { useState } from 'react';
import { Loader } from '@/components/Loader';

type Props = {
  avatar: string;
  userName: string;
  description: string;
  myProfile: boolean
  isPostLoaded: boolean
  setEditPost: (value: boolean) => void;

  // setVisiblePopup: (value: boolean) => void;
  // showAreYouSureModal: boolean;
  // setShowAreYouSureModal: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContent = ({
                              description,
                              userName,
                              avatar,
                              myProfile,
                              setEditPost,
                              isPostLoaded,
                              // setVisiblePopup,
                              // showAreYouSureModal,
                              // setShowAreYouSureModal,
                              onDeletePost,
                            }: Props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  console.log(isPostLoaded);
  return (
    <>
      {isPostLoaded ?
        <div>
          <div className={s.post__header}>
            <div className={s.post__header__wrapper}>
              <div className={s.post__header__user}>
                <Image
                  src={avatar ?? '/img/create-post/no-image.png'}
                  alt={'ava'}
                  width={36}
                  height={36}
                  className={s.header__img}
                />
                <span>{userName}</span>
              </div>
              {myProfile ?
                <Dots setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
                      setShowAreYouSureModal={setShowAreYouSureModal} /> :
                <DotsFriends setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} />}
            </div>
          </div>
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
        </div>
        : <Loader />}
    </>
  );
};
