import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/Loader";

import s from "./InfiniteScrollMyPosts.module.scss";
import { toast } from "react-toastify";
import { GetResponse } from "@/api/profile.api";
import { PostsItem, useGetPostsPaginationQuery, useLazyGetPostsPaginationQuery } from "@/api/posts.api";
import { useScrollFetching } from "@/features/hooks";

type Props = {
  userData: GetResponse;
  setOpen: (value: boolean) => void;
  setSelectedPost: (postId: number) => void;
  getUserPosts: (postsAmount: number) => void;
};

export const InfiniteScrollMyPosts: React.FC<Props> = ({ setSelectedPost, setOpen, userData, getUserPosts }) => {
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] = useState<PostsItem[]>([]);
  const [totalCountPosts, setTotalCountPosts] = useState(1);
  const fetchingValue = useScrollFetching(
    100,
    fetching,
    setFetching,
    pageSize,
    currentPagePosts.length,
    totalCountPosts,
  );
  const { data, isSuccess } = useGetPostsPaginationQuery({ userId: String(userData?.id), pageNumber: 1 });
  const [getPosts, { isLoading: isLoadingPosts }] = useLazyGetPostsPaginationQuery();

  useEffect(() => {
    if (isSuccess) {
      setCurrentPage((prevState) => prevState + 1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data?.items) {
      setPosts(data.items);
      setPageSize(data.pageSize);
      setTotalCountPosts(data.totalCount);
      setCurrentPagePosts(data.items);
      getUserPosts(data.items.length);
    }
  }, [data?.items]);

  useEffect(() => {
    if (posts.length === totalCount) {
      setFetching(false);
      return;
    } else {
      if (fetching) {
        getPosts({ userId: String(userData?.id), pageNumber: currentPage })
          .unwrap()
          .then((res) => {
            if (res?.items) {
              setPosts([...posts, ...res.items]);
              setCurrentPage((prevState) => prevState + 1);
              setTotalCount(res.totalCount);
              setCurrentPagePosts(res.items);
            }
          })
          .catch((err) => toast.error(err.error))
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

  //if (postsError || paginationError) toast.error("Error");

  return (
    <>
      {posts.length > 0 ? (
        postsImages()
      ) : (
        <div className={"m-auto"}>
          <p className={"font-bold text-2xl"}>You don&apos;t have any posts yet 😢</p>
        </div>
      )}
      {isLoadingPosts && <Loader />}
      {fetching && <Loader />}
    </>
  );
};
