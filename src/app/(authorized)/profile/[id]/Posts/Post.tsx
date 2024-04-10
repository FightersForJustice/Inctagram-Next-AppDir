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
import { deletePostById } from './deletePostById';

type Props = {
  post: Post;
  userData: UserProfile;
  myProfile: boolean;
  posts?: any;
  setPosts?: any;
};

export function PostImg({ post, userData, myProfile, posts, setPosts }: Props) {
  const router = useRouter();

  const [openPostModal, setOpenPostModal] = useState(false);
  const [editPost, setEditPost] = useState(false);

  const { data, isLoading, error, isError } = useGetPostQuery(post.id!);

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
        router.push(`/profile/${userData.id}`);
        if (posts) {
          setPosts(deletePostById(posts, post.id));
        }
      }
    }
  };

  if (error) {
    handleApiError(error);
  }

  const currentPosts = post.images.filter(
    (postImage) => postImage.width !== 640
  );

  const openModalWithPost = (id: number) => {
    router.push(`/profile/${userData.id}?post=${id}`, { scroll: false });
  };
  const closeModal = () => {
    router.push(`/profile/${userData.id}`, { scroll: false });
  };
  if (!data) {
    return <Loader />;
  }

  const closeModalAction = () => {
    setOpenPostModal(false);
    closeModal();
  };

  return (
    <>
      {openPostModal && (
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
          </div>
        </>
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
