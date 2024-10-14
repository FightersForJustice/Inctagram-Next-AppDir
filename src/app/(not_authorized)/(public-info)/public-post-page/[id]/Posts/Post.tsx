'use client';
import {
  getPostsDelete,
  updatePost,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import {
  EditPost,
  EditPostMobile,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/EditPost';
import { PostContent } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent';
import { PostContentMobile } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/PostFix/PostContent/PostContentMobile';
import { ProfilePostActions } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AUTH_ROUTES } from 'src/appRoutes/routes';
import { PostType} from '../types';

import s from './Posts.module.scss';

type Props = {
  post: PostType;
  myProfile: boolean;
  type?: 'publicPage' | 'publicProfile';
  isOpenByLink?: boolean;
};

export function  Post ({ post, myProfile, type, isOpenByLink }: Readonly<Props>) {
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
    if (type === 'publicPage') {
      router.push(`${AUTH_ROUTES.PUBLIC_POST_PAGE}?post=${id}`, {
        scroll: false,
      });
    } else if (type === 'publicProfile'){
      router.push(`${AUTH_ROUTES.PUBLIC_PROFILE}/${post.ownerId}?post=${id}`, {
        scroll: false,
      });
    } else {
      router.push(`/profile/${post.ownerId}?post=${id}`, { scroll: false });
    }
  };

  const closeModal = () => {
    if (type === 'publicPage') {
      router.push(AUTH_ROUTES.PUBLIC_POST_PAGE, { scroll: false });
    } else if (type === 'publicProfile'){
      router.push(`${AUTH_ROUTES.PUBLIC_PROFILE}/${post.ownerId}`, {
        scroll: false,
      });
    } else {
      router.push(`/profile/${post.ownerId}`, { scroll: false });
    }
  };

  const closeModalAction = () => {
    setOpenPostModal(false);
    closeModal();
  };

  useEffect(() => {
    isOpenByLink && !openPostModal && onOpenPost();
  }, []);


  const isMyPost =
    width <= 521 ? (
      <EditPostMobile
        post={post}
        setEditPost={setEditPost}
        description={post.description}
        loading={loading}
        onUpdatePost={onUpdatePost}
      />
    ) : (
      <EditPost
        post={post}
        setEditPost={setEditPost}
        description={post.description}
        loading={loading}
        onUpdatePost={onUpdatePost}
      />
    );

  const isPublicPost =
    width <= 521 ? (
      <PostContentMobile
        post={post}
        closeModalAction={closeModalAction}
        myProfile={myProfile}
        setEditPost={setEditPost}
        onDeletePost={onDeletePost}
      />
    ) : (
      <PostContent
        type={type}
        post={post}
        closeModalAction={closeModalAction}
        myProfile={myProfile}
        setEditPost={setEditPost}
        onDeletePost={onDeletePost}
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
