import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';

import s from './PostContent.module.scss';
import { useState } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import PostHeader from '@/app/(authorized)/profile/[id]/Posts/PostHeader/PostHeader';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';
import { PostComment } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostComment';
import { PostLikes } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostLikes';
import { PostAmount } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostAmount';
import { PostForm } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostForm';

type Props = {
  user: UserProfile;
  description: string;
  myProfile: boolean
  images: ImageType[]
  closeModalAction:()=>void
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContentMobile = ({
                              description,
                              user,
                              closeModalAction,
                              myProfile, images,
                              setEditPost,
                              onDeletePost,
                            }: Props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  return (
    <>
      <PostModal
        width={'972px'}
        onClose={closeModalAction}
      >

      <div className={s.post}>
        <PostHeader user={user} myProfile={myProfile} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
                    setShowAreYouSureModal={setShowAreYouSureModal}/>
        <Carousel>
          {images.map((i, index) => {
            if (i.width !== 640) {
              return (
                <SwiperSlide key={index}>
                  {/* <img src={i.url} alt={'err'} /> */}
                  <Image
                    width={491}
                    height={491}
                    alt="err"
                    src={i.url}
                  />
                </SwiperSlide>
              );
            }
            return;
          })}
        </Carousel>
        <PostLikes />
        <PostAmount />
        <div className={s.postInfo}>
          <div className={s.post__desc}>
            <Image
              src={user?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
              alt={'ava'}
              width={36}
              height={36}
              className={s.post__avatar}
            />
            <div>
              <p className={s.post__desc__text}>
                <span className={s.post__desc__name}>{user?.userName} </span>
                {description}
              </p>
              <p className={s.post__desc__time}>2 hours ago</p>
            </div>
          </div>
          <PostComment />
          <PostComment />
          {showAreYouSureModal && (
            <AreYouSureModal
              toggleAreYouSureModal={setShowAreYouSureModal}
              toggleModal={setVisiblePopup}
              onDelete={onDeletePost}
            />
          )}
        </div>
      </div>
      </PostModal>
    </>
  );
};
