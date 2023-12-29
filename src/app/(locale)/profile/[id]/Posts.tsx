'use client';
import Image from 'next/image';
import s from './Posts.module.scss';
import { ApiResponsePosts } from './types';

type Props = {
  postsData: ApiResponsePosts;
};

export const Posts = ({ postsData }: Props) => {
  const postsImages = () => {
    let currentPosts;
    return postsData?.items.map((i) => {
      currentPosts = i.images.filter((postImage) => postImage.width !== 640);
      return (
        <div key={i.id} className={s.imageContainer}>
          <Image
            // fill
            src={
              i.images[0]?.url
                ? currentPosts[0].url
                : '/img/profile/posts/post1.png'
            }
            alt={'post'}
            width={234}
            height={228}
            key={i.id}
            className={s.post}
          />
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
