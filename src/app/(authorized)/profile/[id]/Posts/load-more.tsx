'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ApiResponsePosts, Post, UserProfile } from '../types';
import { actions } from '../actions';
import s from './Posts.module.scss';
import { findMinId } from '@/utils/findMinId';
import { PostImg } from './Post';

type Props = {
  id: number;
  minId: number | undefined;
  userData: UserProfile;
  myProfile: boolean;
};

export function LoadMore({ id, minId, userData, myProfile }: Props) {
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

    if (newPosts) setNewMinId(findMinId(newPosts.items));
  };

  useEffect(() => {
    if (inView && newMinId !== 0) {
      loadMoreBeers(newMinId);
    }
  }, [inView]);

  return (
    <>
      {posts?.map((i) => (
        <div key={i.id} className={s.imageContainer}>
          <PostImg post={i} userData={userData} myProfile={myProfile} />
        </div>
      ))}
      <div ref={ref} style={{ marginTop: '20px' }}></div>
    </>
  );
}
