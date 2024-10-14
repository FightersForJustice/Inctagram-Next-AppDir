import React from 'react';
import s from '../../PostFix/PostContent/PostContent.module.scss';
import Image from 'next/image';
import { Dots } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/Dots';
import { PostType, UserProfile } from '../../types';

type Props = {
  post: PostType;
  myProfile: boolean;
  setVisiblePopup: (value: boolean) => void;
  visiblePopup: boolean;
  setEditPost: (value: boolean) => void;
  setShowAreYouSureModal: (value: boolean) => void;
}


const PostHeader = ({
                      post, myProfile, visiblePopup,
                      setVisiblePopup,
                      setEditPost,
                      setShowAreYouSureModal,
                    }: Props) => {
  return (
    <div className={s.post__header}>
      <div className={s.post__header__user}>
        <Image
          src={post.avatarOwner ?? '/img/create-post/no-image.png'}
          alt={'ava'}
          width={36}
          height={36}
          className={s.header__img}
        />
        <span>{post.userName}</span>
      </div>
      {myProfile ?
        <Dots setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
              setShowAreYouSureModal={setShowAreYouSureModal} /> :
        // <DotsFriends setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} />
        null
        }
    </div>
  );
};

export default PostHeader;