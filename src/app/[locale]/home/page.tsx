'use client';

import { useEffect, useState } from 'react';
import { SideBar } from '../my-profile/Navigation/SideBar';
import { usePathname } from 'next-intl/client';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import { HomePagePost } from './HomePagePost';
import { PostsItem, useLazyGetAllPostsQuery } from '@/api/posts.api';
import { useScrollFetching } from '@/features/customHooks';

import s from './Home.module.scss';
import { StatusCode } from '@/api/auth.api';

const Home = () => {
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number>(0);
  const [totalCount, setTotalCount] = useState(0);

  const [getPosts, { isLoading }] = useLazyGetAllPostsQuery();
  const fetchingValue = useScrollFetching(
    100,
    fetching,
    setFetching,
    posts.length,
    totalCount
  );

  const loadMorePosts = () => {
    if (!isLoading) {
      getPosts({
        idLastUploadedPost: lastLoadedPostId,
        pageSize: 5,
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
      pageSize: 5,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })
      .unwrap()
      .then((res) => {
        setPosts(res.items);
        setLastLoadedPostId(res.items[res.items.length - 1].id);
        setTotalCount(res.totalCount);
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

  const allPosts = posts.map((item, index) => (
    <HomePagePost key={item.id} post={item} images={posts[index].images} />
  ));

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={'wrapper'}>
          <SideBar pathname={pathname} paidAccount={false} />
          <div style={{ gridArea: 'profile' }}>{allPosts}</div>
        </div>
      </div>
      {isLoading && <Loader />}
      {fetching && <Loader />}
    </>
  );
};

export default Home;
