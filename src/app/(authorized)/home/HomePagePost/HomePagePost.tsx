'use client';

import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/Loader';
import {
  getFollowersPosts,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { HomePost } from '@/app/(authorized)/home/HomePagePost/HomePost/HomePost';

import s from './HomePagePost.module.scss';

type PropsType = {
  id: string | null
}

export const HomePagePost = ({ id }: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<ApiResponsePosts | null>(null);
  const [endCursorPostId, setEndCursorPostId] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getFollowersPosts(endCursorPostId);
        setPostsData(res);
        setEndCursorPostId(res.items[res.items.length - 1].id);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const loadMorePosts = async () => {
    if (!hasMorePosts || loading) return;

    setLoading(true);
    try {
      const res = await getFollowersPosts(endCursorPostId);

      if (res.items.length === 0) {
        setHasMorePosts(false);
        return;
      }

      setPostsData(prev => ({
        ...res,
        items: prev ? [...prev.items, ...res.items] : res.items,
      }));

      // Обновляем ID последнего поста
      setEndCursorPostId(res.items[res.items.length - 1].id);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 300) {
          loadMorePosts();
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [loading, endCursorPostId, hasMorePosts]);


  return (
    <div>
      {postsData?.items.map((i) => (
        <div key={i.id} className={s.post}>
          <HomePost post={i} id={id} />
        </div>
      ))}
      {loading && <Loader />}
    </div>
  );
};