'use client';
import s from './Posts.module.scss';
import { ApiResponsePosts, UserProfile } from '../types';
import { PostImg } from './Post';

type Props = {
  postsData: ApiResponsePosts;
  userData: UserProfile;
};

export const Posts = ({ postsData, userData }: Props) => {
  const postsImages = () => {
    let currentPosts;
    return postsData?.items.map((i) => {
      currentPosts = i.images.filter((postImage) => postImage.width !== 640);
      return (
        <div key={i.id} className={s.imageContainer}>
          <PostImg post={i} userData={userData} />
        </div>
      );
    });
  };

  return (
    <>
      {postsData.items.length > 0 ? (
        postsImages()
      ) : (
        <div className={s.container}>
          <p className={s.text}>You don&apos;t have any posts yet 😢</p>
        </div>
      )}
    </>
  );
};
