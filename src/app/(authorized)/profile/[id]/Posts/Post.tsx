import Image from 'next/image';
import s from './Posts.module.scss';
import { Post, UserProfile } from '../types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeletePostMutation, useGetPostQuery } from '@/api';
import { Loader } from '@/components/Loader';
import { handleApiError } from '@/utils';
import { toast } from 'react-toastify';
import { getPostsDelete } from '@/app/(authorized)/profile/[id]/actions';
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
  const { data, isLoading,  error, isError } = useGetPostQuery(
    post.id!,
  );

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
      }
    }
  };

  if (error) {
    handleApiError(error);
  }

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

  const closeModalAction = () => {
    setOpenPostModal(false);
    closeModal();
  };

  return <>
      {
        openPostModal &&
        <>
          <div className={'relative'}>
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
                closeModalAction={closeModalAction}
                images={data.images}
                myProfile={myProfile}
                avatar={userData?.avatars[0]?.url}
                userName={userData?.userName}
                description={data.description}
                setEditPost={setEditPost}
                onDeletePost={onDeletePost}
              />
            )}
            {isLoading && !isError && <Loader />}
            {isDeleting && <Loader />}
          </div>
        </>
      }

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
}
