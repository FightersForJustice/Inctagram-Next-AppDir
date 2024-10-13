'use client';

import { ApiResponsePosts } from '@/redux/reducers/MyProfile/ProfilePostReducer';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import {
  getFollowersPosts
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';
import { HomePost } from '@/app/(authorized)/home/HomePagePost/HomePost/HomePost';

import s from './HomePagePost.module.scss';

type PropsType = {
  id: string | null
}

export const HomePagePost = ({ id }: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<ApiResponsePosts | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getFollowersPosts();
        setPostsData(res);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return postsData?.items.map((i) => {
    return (
      <div key={i.id} className={s.post}>
        <HomePost post={i} id={id}/>
      </div>
    );
  });
};
