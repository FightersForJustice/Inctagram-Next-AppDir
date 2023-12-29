'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ApiResponsePosts, Post } from './types';
import { actions } from './actions';
import Image from 'next/image';
import s from './Posts.module.scss';
import { findMinId } from '@/utils/findMinId';

type Props = {
  id: number;
  minId: number | undefined;
};

export function LoadMore({ id, minId }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newMinId, setNewMinId] = useState<number | null>(null);

  if (newMinId === null && minId !== undefined) {
    setNewMinId(minId);
  }
  const { ref, inView } = useInView();

  const loadMoreBeers = async (newMinId: number | null) => {
    const newPosts: ApiResponsePosts =
      (await actions.getPosts(id, newMinId)) ?? [];
    setPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts.items]);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBeers(newMinId);
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
      <div ref={ref} style={{ marginTop: '20px' }}></div>
    </>
  );
}
