import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../../../../../components/Loader/Loader";
import { PostsItem, useLazyGetPostsPaginationQuery } from "../../../../../api/posts.api";
import { GetResponse } from "../../../../../api/profile.api";
import useScrollFetching from "../../../../../features/hooks/useScrollListener";

import s from "./InfiniteScrollMyPosts.module.scss";

type Props = {
  userData: GetResponse;
  setOpen: (value: boolean) => void;
  setSelectedPost: (postId: number) => void;
};

export const InfiniteScrollMyPosts: React.FC<Props> = ({ setSelectedPost, setOpen, userData }) => {
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [getPosts, { isSuccess, data, isLoading }] = useLazyGetPostsPaginationQuery();
  const fetchingValue = useScrollFetching(100, fetching, setFetching);

  useEffect(() => {
    if (data?.items) {
      setPosts(data.items);
    }
  }, [data?.items]);

  useEffect(() => {
    if (posts.length === totalCount) {
      setFetching(false);
      return;
    } else {
      const userId = sessionStorage.getItem("userId");
      if (fetching && userId) {
        getPosts({ userId, pageNumber: currentPage })
          .unwrap()
          .then((res) => {
            if (res?.items) {
              setPosts([...posts, ...res.items]);
              setCurrentPage((prevState) => prevState + 1);
              setTotalCount(res.totalCount);
            }
          })
          .finally(() => setFetching(false));
      }
    }
  }, [fetchingValue]);

  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };

  const postsImages = () => {
    return posts.map((i) => {
      return (
        <Image
          src={i.images[0]?.url ? i.images[0]?.url : "/img/profile/posts/post1.png"}
          alt={"post"}
          width={234}
          height={228}
          key={i.id}
          onClick={() => openPostHandler(i.id)}
          className={s.post}
        />
      );
    });
  };

  return (
    <>
      {posts.length > 0 ? (
        postsImages()
      ) : (
        <div className={"m-auto"}>
          <p className={"font-bold text-2xl"}>You don&apos;t have any posts yet 😢</p>
        </div>
      )}
      {isLoading && <Loader />}
      {fetching && <Loader />}
    </>
  );
};
