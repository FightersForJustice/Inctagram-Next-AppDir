import Image from 'next/image';
import s from './Posts.module.scss';
import { Post, UserProfile } from '../types';
import { useState } from 'react';
import { PostModal } from '@/components/Modals/PostModal';
import { PostFix } from '@/app/(authorized)/profile/[id]/PostFix';
import { useRouter } from 'next/navigation';

type Props = {
  post: Post;
  userData: UserProfile;
  myProfile: boolean;
};

export function PostImg({ post, userData, myProfile }: Props) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const currentPosts = post.images.filter(
    (postImage) => postImage.width !== 640
  );
  const router = useRouter();
  const openModalWithPost = (id: number) => {
    router.push(`/profile/${userData.id}?post=${id}`);
  };
  const closeModal = () => {
    router.push(`/profile/${userData.id}`);
  };
  return (
    <>
      {openPostModal && (
        <PostModal
          width={'972px'}
          onClose={() => {
            setOpenPostModal(false), closeModal();
          }}
        >
          <PostFix
            onClose={() => setOpenPostModal(false)}
            postId={post.id}
            avatar={userData?.avatars[0]?.url}
            userName={userData?.userName}
            setOpenPostModal={setOpenPostModal}
            myProfile={myProfile}
          />
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
        className={s.post}
        onClick={() => {
          setOpenPostModal(true), openModalWithPost(post.id);
        }}
      />
    </>
  );
}
