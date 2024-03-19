import Image from 'next/image';
import s from './Posts.module.scss';
import { Post, UserProfile } from '../types';
import { useState } from 'react';
import { PostModal } from '@/components/Modals/PostModal';
import { useRouter } from 'next/navigation';
import { useDeletePostMutation, useGetPostQuery } from '@/api';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/Loader';
import { handleApiError } from '@/utils';
import { toast } from 'react-toastify';
import { getPostsDelete } from '@/app/(authorized)/profile/[id]/actions';
import { Carousel } from '@/components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { EditPost } from '@/app/(authorized)/profile/[id]/PostFix/EditPost';
import { PostContent } from '@/app/(authorized)/profile/[id]/PostFix/PostContent';

type Props = {
  post: Post;
  userData: UserProfile;
  myProfile: boolean;
};

export function PostImg({ post, userData, myProfile }: Props) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [editPost, setEditPost] = useState(false);

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { data, isLoading, isSuccess, error, isError } = useGetPostQuery(
    post.id!,
  );
  const onDeletePost = async () => {
    if (post.id) {
      const response = await getPostsDelete(post.id);
      if (response === 204) {
        setOpenPostModal(false);
        toast.success('Post was deleted');
      }
    }
  };

  if (error) {
    handleApiError(error);
  }
  // const { t } = useTranslation();
  // const translate = (key: string): string =>
  //   t(`CreatePost.EditPost.${key}`);
  const currentPosts = post.images.filter(
    (postImage) => postImage.width !== 640,
  );
  const router = useRouter();
  const openModalWithPost = (id: number) => {
    router.push(`/profile/${userData.id}?post=${id}`);
  };
  const closeModal = () => {
    router.push(`/profile/${userData.id}`);
  };
  if (!data) {
    return <Loader />;
  }
  return (
    <>

          {openPostModal && (
            <PostModal
              width={'972px'}
              onClose={() => {
                setOpenPostModal(false), closeModal();
              }}
            >
              <>
                <div className={'relative'}>
                  {/*{editPost &&*/}
                  {/*  <div className={s.post__editTitle}>*/}
                  {/*    <h1>Edit Post</h1>*/}
                  {/*    {showCloseEditModal && isPostChanged &&*/}
                  {/*      <EditPostModal title={translate('title')} onSubmit={changeEditStatus}*/}
                  {/*                     onClose={onCloseEditMode}>{translate('editModalText')}</EditPostModal>}*/}
                  {/*    <Image onClick={onCloseClick} src={close} alt={'close'}*/}
                  {/*           className={s.post__editCancel} />*/}
                  {/*  </div>}*/}
                  {/*<div className={s.post}>*/}
                    {/*{isSuccess ? (*/}
                    {/*<div className={s.post__img}>*/}
                    {/*  <Carousel >*/}
                    {/*    {data?.images.map((i, index) => {*/}
                    {/*      if (i.width !== 640) {*/}
                    {/*        return (*/}
                    {/*          <SwiperSlide key={index} >*/}
                    {/*            /!* <img src={i.url} alt={'err'} /> *!/*/}
                    {/*            <Image*/}
                    {/*              width={491}*/}
                    {/*              height={491}*/}
                    {/*              alt="err"*/}
                    {/*              src={i.url}*/}
                    {/*            />*/}
                    {/*          </SwiperSlide>*/}
                    {/*        );*/}
                    {/*      }*/}
                    {/*      return;*/}
                    {/*    })}*/}
                    {/*  </Carousel>*/}
                    {/*</div>*/}
                    {/*) : (*/}
                    {/*   <Loader />*/}
                    {/* )}*/}

                    {/*<div className={s.post__container}>*/}
                      {/*<div className={s.post__header}>*/}
                      {/*<div className={s.post__header__wrapper}>*/}
                      {/*  <Image*/}
                      {/*    src={userData?.avatars[0]?.url ?? '/img/create-post/no-image.png'}*/}
                      {/*    alt={'ava'}*/}
                      {/*    width={36}*/}
                      {/*    height={36}*/}
                      {/*    className={s.post__header__img}*/}
                      {/*  />*/}
                      {/*  <p>{userData?.userName}</p>*/}
                      {/*</div>*/}

                      {editPost ? (
                        <EditPost
                          images={data.images}
                          postId={post.id}
                          setEditPost={setEditPost}
                          avatar={userData?.avatars[0]?.url}
                          userName={userData?.userName}
                          description={data.description}
                        />
                      ) : (
                        <PostContent
                          images={data.images}
                          myProfile={myProfile}
                          avatar={userData?.avatars[0]?.url}
                          userName={userData?.userName}
                          description={data.description}
                          setEditPost={setEditPost}
                          onDeletePost={onDeletePost}
                        />
                      )}
                    </div>
                  {/*</div>*/}
                {/*</div>*/}
                {isLoading && !isError && <Loader />}
                {isDeleting && <Loader />}
              </>
              {/*<PostFix*/}
              {/*  onClose={() => setOpenPostModal(false)}*/}
              {/*  postId={post.id}*/}
              {/*  avatar={userData?.avatars[0]?.url}*/}
              {/*  userName={userData?.userName}*/}
              {/*  setOpenPostModal={setOpenPostModal}*/}
              {/*  myProfile={myProfile}*/}
              {/*/>*/}
            </PostModal>
          )}
          <Image
            src={
              post.images[0]?.url
                ? currentPosts[0].url
                : '/img/profile/posts/post1.png'
            }
            alt={'post'}
            width={234}
            height={228}
            className={s.imagePost}
            onClick={() => {
              setOpenPostModal(true), openModalWithPost(post.id);
            }}
          />


    </>
  )
    ;
}
