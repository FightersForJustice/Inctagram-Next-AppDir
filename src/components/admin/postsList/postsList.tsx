'use client';

import React, { useEffect, useState } from 'react';
import { useGetCurrentPostsQuery } from '@/queries/posts/posts.generated';
import { PostClient } from '@/components/admin/postsList/postClient/postClient';
import { Loader } from '@/components/Loader';
import { SortDirection } from '@/types';
import { SearchInput } from '@/components/admin/shared/searchInput/searchInput';
import { useDebounce } from '@/utils/useDebaunce';
import { useRouter, useSearchParams } from 'next/navigation';

import s from './postsList.module.scss';

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
  const [posts, setPosts] = useState<ItemsType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const urlParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const searchFromUrl = urlParams.get('searchTerm') || '';
    if (!searchTerm && searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [urlParams]);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { data, loading, fetchMore, refetch } = useGetCurrentPostsQuery({
    variables: {
      pageSize: 10,
      endCursorPostId: 0,
      sortBy: 'createdAt',
      sortDirection: 'desc' as SortDirection,
      searchTerm: debouncedSearchTerm,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const params = new URLSearchParams(urlParams.toString());

    if (debouncedSearchTerm) {
      params.set('searchTerm', debouncedSearchTerm);
    } else {
      params.delete('searchTerm');
    }

    router.replace(`/admin/postslist?${params.toString()}`);
    refetch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (data?.getPosts?.items) {
      setPosts(prevPosts => (searchTerm ? prevPosts : data.getPosts.items));
      setAllPostsLoaded(data.getPosts.items.length < 10);
    }
  }, [data]);

  useEffect(() => {
    if (data?.getPosts?.items) {
      setPosts(data.getPosts.items);
      setAllPostsLoaded(data.getPosts.items.length < 10);
    }
  }, [data]);

  const loadMorePosts = () => {
    if (loadingMore || allPostsLoaded) return;

    setLoadingMore(true);

    const lastPostId = posts.length ? posts[posts.length - 1].id : 0;

    fetchMore({
      variables: {
        endCursorPostId: lastPostId,
        searchTerm: debouncedSearchTerm,
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
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {loading ?
        <Loader />
        :
        <div className={s.postWrapper}>
          <PostClient posts={posts} />
        </div>
      }
      {allPostsLoaded && <div className={s.noMorePosts}>No more posts to load</div>}
    </div>
  );
};
