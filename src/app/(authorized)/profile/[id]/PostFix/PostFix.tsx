'use client';

import { useDeletePostMutation, useGetPostQuery } from '@/api';
import { Carousel } from '@/components/Carousel/Carousel';
import { Loader } from '@/components/Loader';
import { handleApiError } from '@/utils';
import Image from 'next/image';
import React, { MouseEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import { getPostsDelete } from '../actions';
import { Dots } from './Dots';
import { DotsFriends } from './DotsFriends';
import { EditPost } from './EditPost';
import { PostContent } from './PostContent';
import close from 'public/img/close.svg';
import s from './PostFix.module.scss';

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  postId: number | undefined;
  avatar: string;
  userName: string;
  setOpenPostModal: (value: boolean) => void;
  myProfile: boolean;
};

export const PostFix: React.FC<Props> = ({
  onClose,
  postId,
  avatar,
  userName,
  setOpenPostModal,
  myProfile,
}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showDots, setShowDots] = useState(true);
  const [editPost, setEditPost] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const { data, isLoading, isSuccess, error, isError } = useGetPostQuery(
    postId!
  );

  console.log('>>> POST DATA >>>', data);
  const onDeletePost = async () => {
    if (postId) {
      const response = await getPostsDelete(postId);
      if (response === 204) {
        setOpenPostModal(false);
        toast.success('Post was deleted');
      }
    }
  };

  if (error) {
    handleApiError(error);
  }
  const changeEditStatus = () => {
    setEditPost(false);
    setShowDots(true);
  };

  return (
    <>
      {data ? (
        <div className={'relative'}>
          {editPost && (
            <div className={s.post__editTitle}>
              <h1>Edit Post</h1>
              <Image
                onClick={changeEditStatus}
                src={close}
                alt={'close not found'}
                className={s.post__editCancel}
              />
            </div>
          )}
          <div className={s.post}>
            {isSuccess ? (
              <div className={s.post__img}>
                <Carousel>
                  {data.images.map((i, index) => {
                    if (i.width !== 640) {
                      return (
                        <SwiperSlide key={index} className={'w-full'}>
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
              </div>
            ) : (
              <Loader />
            )}

            <div className={s.post__container}>
              <div className={s.post__header}>
                <div className={s.post__header__wrapper}>
                  <Image
                    src={avatar ?? '/img/create-post/no-image.png'}
                    alt={'ava'}
                    width={36}
                    height={36}
                    className={s.post__header__img}
                  />
                  <p>{userName}</p>
                </div>

                {showDots ? (
                  myProfile ? (
                    <Dots
                      setVisiblePopup={setVisiblePopup}
                      visiblePopup={visiblePopup}
                      setEditPost={setEditPost}
                      setShowAreYouSureModal={setShowAreYouSureModal}
                      setShowDots={setShowDots}
                    />
                  ) : (
                    <DotsFriends
                      setVisiblePopup={setVisiblePopup}
                      visiblePopup={visiblePopup}
                    />
                  )
                ) : (
                  <div className={'w-1/12'}></div>
                )}
              </div>
              {editPost ? (
                <EditPost
                  setEditPost={setEditPost}
                  description={data.description}
                  postId={postId}
                  setShowDots={setShowDots}
                />
              ) : (
                <PostContent
                  avatar={avatar}
                  userName={userName}
                  description={data.description}
                  setVisiblePopup={setVisiblePopup}
                  showAreYouSureModal={showAreYouSureModal}
                  setShowAreYouSureModal={setShowAreYouSureModal}
                  onDeletePost={onDeletePost}
                />
              )}
            </div>
          </div>
          <button
            className={'absolute top-[-14px] right-[-37px]'}
            onClick={onClose}
          >
            <Image
              src={'/img/close.svg'}
              alt={'close'}
              width={24}
              height={24}
            />
          </button>
        </div>
      ) : (
        <Loader /> //при ошибке постоянно крутиться лоадер
      )}
      {isLoading && !isError && <Loader />}
      {isDeleting && <Loader />}
    </>
  );
};
