'use client';

import React, { useEffect, useState } from 'react';
import { useGetCurrentPostsQuery } from '@/queries/posts/posts.generated';
import { PostClient } from '@/components/admin/postsList/postClient/postClient';
import { Loader } from '@/components/Loader';
import s from './postsList.module.scss';
import { SortDirection } from '@/types';
import { SearchInput } from '@/components/admin/shared/searchInput/searchInput';

export type ItemsType = {
  __typename?: 'Post',
  id: number,
  ownerId: number,
  description: string,
  createdAt: any,
  updatedAt: any,
  images?: Array<{
    __typename?: 'ImagePost',
    id?: number | null,
    createdAt?: any | null,
    url?: string | null,
    width?: number | null,
    height?: number | null,
    fileSize?: number | null
  }> | null,
  postOwner: {
    __typename?: 'PostOwnerModel',
    id: number,
    userName: string,
    avatars?: Array<{
      __typename?: 'Avatar',
      url?: string | null,
      width?: number | null,
      height?: number | null,
      fileSize?: number | null
    }> | null
  }
};

export const PostsListClient = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [posts, setPosts] = useState<ItemsType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const setNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const { data, fetchMore, refetch } = useGetCurrentPostsQuery({
    variables: {
      pageSize: 20,
      endCursorPostId: 0,
      sortBy: 'createdAt',
      sortDirection: 'desc' as SortDirection,
      searchTerm,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.getPosts?.items) {
      setPosts(prevPosts => (searchTerm ? prevPosts : data.getPosts.items));
      setAllPostsLoaded(data.getPosts.items.length < 20);
    }
  }, [data]);

  useEffect(() => {

    if (searchTerm) {
      setPosts([]);
      refetch().then((fetchResult) => {
        const newPosts = fetchResult.data.getPosts.items;
        setPosts(newPosts);
        setAllPostsLoaded(newPosts.length < 10);
      });
    } else {
      refetch();
    }
  }, [searchTerm, refetch]);

  const loadMorePosts = () => {
    if (loadingMore || allPostsLoaded) return;

    setLoadingMore(true);

    const lastPostId = posts.length ? posts[posts.length - 1].id : 0;

    fetchMore({
      variables: {
        endCursorPostId: lastPostId,
        searchTerm,
      },
    }).then((fetchMoreResult) => {
      const newPosts = fetchMoreResult.data.getPosts.items;

      if (newPosts.length > 0) {
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
      <div className={s.container}>
        <SearchInput onChange={setNameHandler} />
      </div>
      <div className={s.postWrapper}>
        <PostClient posts={posts} />
        {allPostsLoaded && <div>No more posts to load</div>}
      </div>
    </div>
  );
};
