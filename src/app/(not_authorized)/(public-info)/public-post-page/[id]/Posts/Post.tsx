'use client';
import Image from 'next/image';

import s from './Posts.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  getPostsDelete,
  updatePost,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import {
  EditPost,
  EditPostMobile,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/EditPost';
import { PostContent } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent';
import { useDispatch } from 'react-redux';
import { ProfilePostActions } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { PostContentMobile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostContentMobile';
import { UserProfile, PostType } from '../types';

type Props = {
  post: PostType;
  userData: UserProfile;
  myProfile: boolean;
};

export function Post({ post, userData, myProfile }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openPostModal, setOpenPostModal] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [width, setWidth] = useState(1920);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onOpenPost = () => {
    setOpenPostModal(true);
    openModalWithPost(post.id);
  };

  const onDeletePost = async () => {
    if (post.id) {
      const response = await getPostsDelete(post.id);
      if (response === 204) {
        setOpenPostModal(false);
        toast.success('Post was deleted');
        dispatch(ProfilePostActions.removeItemById(post.id));
      }
    }
  };

  const onUpdatePost = async (postId: number, textareaValue: string) => {
    setLoading(true);
    const status = await updatePost(postId, textareaValue);
    if (status === 204) {
      dispatch(ProfilePostActions.updateItemById({ postId, textareaValue }));
      setEditPost(false);
      toast.success('Post was updated');
    } else {
      toast.error('Failed to update post');
    }
    setLoading(false);
  };

  const currentPosts = post.images.filter(
    (postImage) => postImage.width !== 640
  );

  const openModalWithPost = (id: number) => {
    if (myProfile) {
      router.push(`/profile/${userData.id}?post=${id}`, { scroll: false });
    }
  };
  const closeModal = () => {
    if (myProfile) {
      router.push(`/profile/${userData.id}`, { scroll: false });
    }
  };

  const closeModalAction = () => {
    setOpenPostModal(false);
    closeModal();
  };

  const isMyPost =
    width <= 521 ? (
      <EditPostMobile
        images={post.images}
        postId={post.id}
        setEditPost={setEditPost}
        user={userData}
        description={post.description}
        loading={loading}
        onUpdatePost={onUpdatePost}
      />
    ) : (
      <EditPost
        images={post.images}
        postId={post.id}
        setEditPost={setEditPost}
        user={userData}
        description={post.description}
        loading={loading}
        onUpdatePost={onUpdatePost}
      />
    );

  const isPublicPost =
    width <= 521 ? (
      <PostContentMobile
        closeModalAction={closeModalAction}
        images={post.images}
        myProfile={myProfile}
        user={userData}
        description={post.description}
        setEditPost={setEditPost}
        onDeletePost={onDeletePost}
        createdPostTime={post.createdAt}
      />
    ) : (
      <PostContent
        closeModalAction={closeModalAction}
        images={post.images}
        myProfile={myProfile}
        user={userData}
        description={post.description}
        setEditPost={setEditPost}
        onDeletePost={onDeletePost}
        createdPostTime={post.createdAt}
      />
    );

  return (
    <>
      {openPostModal && (
        <div className={'relative'}>{editPost ? isMyPost : isPublicPost}</div>
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
        onClick={onOpenPost}
      />
    </>
  );
}