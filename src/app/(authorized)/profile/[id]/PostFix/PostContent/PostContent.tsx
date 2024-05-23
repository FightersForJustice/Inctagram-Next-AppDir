import Image from 'next/image';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { PostComment } from './PostComment';
import { PostLikes } from './PostLikes';

import s from './PostContent.module.scss';
import { useState } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { ImageType } from '@/api/posts.api';
import { SwiperSlide } from 'swiper/react';
import { PostModal } from '@/components/Modals/PostModal';
import PostHeader from '@/app/(authorized)/profile/[id]/Posts/PostHeader/PostHeader';
import { UserProfile } from '@/app/(authorized)/profile/[id]/types';
import { PostForm } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostForm';
import { PostAmount } from '@/app/(authorized)/profile/[id]/PostFix/PostContent/PostAmount';

type Props = {
  user: UserProfile;
  description: string;
  myProfile: boolean
  images: ImageType[]
  closeModalAction:()=>void
  setEditPost: (value: boolean) => void;
  onDeletePost: () => void;
};

export const PostContent = ({
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
        <div className={s.postInfo}>
          <PostHeader user={user} myProfile={myProfile} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} setEditPost={setEditPost}
                      setShowAreYouSureModal={setShowAreYouSureModal}/>
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
          <PostLikes />
          <PostAmount />
          <PostForm />
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
