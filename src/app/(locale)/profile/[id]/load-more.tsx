'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ApiResponsePosts, Post } from './types';
import { actions } from './actions';
import Image from 'next/image';
import s from './Posts.module.scss';

type Props = {
  id: number;
  minId: number | undefined;
};

export function LoadMore({ id, minId }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  const findMinId = (): number | undefined => {
    if (posts.length === 0) {
      return undefined;
    }
    const minId = posts.reduce(
      (min, post) => (post.id < min ? post.id : min),
      posts[0].id
    );
    return minId;
  };

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async (minId: number | undefined) => {
    const newPosts: ApiResponsePosts =
      (await actions.getPosts(id, minId)) ?? [];
    setPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts.items]);
    minId = findMinId();
  };

  useEffect(() => {
    if (inView) {
      loadMoreBeers(minId);
    }
  }, [inView]);

  return (
    <>
      {posts?.map((i) => (
        <div key={i.id} className={s.imageContainer}>
          <Image
            // fill
            src={
              i.images[0]?.url
                ? i.images.filter((postImage) => postImage.width !== 640)[0].url
                : '/img/profile/posts/post1.png'
            }
            alt={'post'}
            width={234}
            height={228}
            key={i.id}
            className={s.post}
          />
        </div>
      ))}
      <div ref={ref}></div>
    </>
  );
}
