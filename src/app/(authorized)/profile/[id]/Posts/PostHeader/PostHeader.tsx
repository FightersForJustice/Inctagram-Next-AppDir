import React from 'react';
import s from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostContent.module.scss';
import Image from 'next/image';
import { Dots } from '@/app/(authorized)/profile/[id]/PostFix/Dots';
import { DotsFriends } from '@/app/(authorized)/profile/[id]/PostFix/DotsFriends';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';

type Props = {
  user: UserProfile,
  myProfile: boolean,
  setVisiblePopup: (value: boolean) => void;
  visiblePopup: boolean;
  setEditPost: (value: boolean) => void;
  setShowAreYouSureModal: (value: boolean) => void;
}


const PostHeader = ({
                      user, myProfile, visiblePopup,
                      setVisiblePopup,
                      setEditPost,
                      setShowAreYouSureModal,
                    }: Props) => {
  return (
    <div className={s.post__header}>
      <div className={s.post__header__user}>
        <Image
          src={user?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
          alt={'ava'}
          width={66}
          height={36}
          className={s.header__img}
        />
        <span>{user?.userName}</span>
      </div>
      {myProfile ?
        <Dots setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
              setShowAreYouSureModal={setShowAreYouSureModal} /> :
        <DotsFriends setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} />}
    </div>
  );
};

export default PostHeader;