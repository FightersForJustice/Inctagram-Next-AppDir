'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGetParams } from '@/utils/useGetParams';
import { useGetCurrentUserPostsQuery } from '@/queries/posts/posts.generated';
import s from './ProfileServer.module.scss';
import f from './Posts.module.scss';

export const PhotosClient = ({ id }: { id: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const url = useGetParams();

  const { data, fetchMore } = useGetCurrentUserPostsQuery({
    variables: {
      userId: Number(id),
      endCursorId: 0,
    },
  });

  useEffect(() => {
    if (data?.getPostsByUser?.items) {
      setPosts(data.getPostsByUser.items);
      setAllPostsLoaded(data.getPostsByUser.items.length < 10);
    }
  }, [data]);

  const loadMorePosts = () => {
    if (loadingMore || allPostsLoaded) return;

    setLoadingMore(true);

    const lastPostId = posts.length ? posts[posts.length - 1].id : 0;

    fetchMore({
      variables: {
        endCursorId: lastPostId,
      },
    }).then((fetchMoreResult) => {
      const newPosts = fetchMoreResult.data.getPostsByUser.items;

      if (newPosts && newPosts.length > 0) {
        setPosts((prevPosts) => {
          const existingPostIds = new Set(prevPosts.map(post => post.id));
          const filteredNewPosts = newPosts.filter(post => !existingPostIds.has(post.id));
          return [...prevPosts, ...filteredNewPosts];
        });
      } else {
        setAllPostsLoaded(true);
      }
    }).finally(() => {
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 300) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadingMore, allPostsLoaded, posts]);

  return (
    <div>
      <div className={s.posts}>
        {posts.map((el) => {
          return (
            <div key={el.id} className={f.imageContainer}>
              <Image
                src={el?.url ? el.url : '/img/profile/posts/post1.png'}
                alt={'post'}
                width={234}
                height={228}
                className={s.imagePost}
              />
            </div>
          );
        })}
      </div>
      {allPostsLoaded && <div className={s.noMorePosts}>No more posts to load</div>}
    </div>
  );
};
