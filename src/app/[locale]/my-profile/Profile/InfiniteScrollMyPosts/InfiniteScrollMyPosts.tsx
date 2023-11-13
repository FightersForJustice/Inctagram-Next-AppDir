import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader } from '@/components/Loader';
import s from './InfiniteScrollMyPosts.module.scss';
import { PostsItem, useLazyGetUserPostsQuery } from '@/api/posts.api';
import { useScrollFetching } from '@/features/customHooks';
import { toast } from 'react-toastify';
import { StatusCode } from '@/api/auth.api';

type Props = {
  setOpen: (value: boolean) => void;
  setSelectedPost: (postId: number) => void;
  getUserPosts: (value: PostsItem[]) => void;
  postChanges: boolean;
};

export const InfiniteScrollMyPosts: React.FC<Props> = ({
  setSelectedPost,
  setOpen,
  getUserPosts,
}) => {
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(false);
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number>(0);
  const [totalCount, setTotalCount] = useState(0);
  const fetchingValue = useScrollFetching(
    100,
    fetching,
    setFetching,
    posts.length,
    totalCount
  );

  const [getPosts, { isFetching, data }] = useLazyGetUserPostsQuery();

  const loadMorePosts = () => {
    if (!isFetching) {
      getPosts({
        idLastUploadedPost: lastLoadedPostId,
        pageSize: 12,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      })
        .unwrap()
        .then((res) => {
          if (res?.items) {
            setPosts([...posts, ...res.items]);
            setLastLoadedPostId(res.items[res.items.length - 1].id);
            setTotalCount(res.totalCount);
          }
        })
        .catch((err) => toast.error(err.error))
        .finally(() => setFetching(false));
    }
  };

  useEffect(() => {
    getPosts({
      idLastUploadedPost: lastLoadedPostId!,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })
      .unwrap()
      .then((res) => {
        setPosts(res.items);
        setLastLoadedPostId(res.items[res.items.length - 1].id);
        setTotalCount(res.totalCount);
        getUserPosts(res.items);
      })
      .catch((err) => {
        if (err.statusCode === StatusCode.noAddress) {
          toast.error('Error 404');
        }
        toast.error(err.error);
      });
  }, []);

  useEffect(() => {
    if (fetching && posts.length < totalCount) {
      loadMorePosts();
    }
  }, [fetchingValue]);

  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };

  const postsImages = () => {
    let currentPosts;
    return data?.items.map((i) => {
      currentPosts = i.images.filter((postImage) => postImage.width !== 640);
      return (
        <div key={i.id} className={'overflow-hidden'}>
          <Image
            src={
              i.images[0]?.url
                ? currentPosts[currentPosts.length - 1].url
                : '/img/profile/posts/post1.png'
            }
            alt={'post'}
            width={234}
            height={228}
            key={i.id}
            onClick={() => openPostHandler(i.id)}
            className={s.post}
          />
        </div>
      );
    });
  };

  return (
    <>
      {posts.length > 0 ? (
        postsImages()
      ) : (
        <div className={'m-auto'}>
          <p className={'font-bold text-2xl'}>
            You don&apos;t have any posts yet 😢
          </p>
        </div>
      )}
      {/* {isFetching && <Loader />} */}
      {fetching && <Loader />}
    </>
  );
};
