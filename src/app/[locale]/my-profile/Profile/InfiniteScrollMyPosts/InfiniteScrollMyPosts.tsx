import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/Loader";

import s from "./InfiniteScrollMyPosts.module.scss";
import { GetResponse } from "@/api/profile.api";
import { PostsItem, useGetUserPostsQuery } from "@/api/posts.api";

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
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number>(200);

  const { data, isLoading } = useGetUserPostsQuery({
    idLastUploadedPost: lastLoadedPostId,
    pageSize: 5,
    pageNumber: currentPage + 1,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  useEffect(() => {
    if (data?.items) {
      setPosts(data.items);
    }
  }, [data]);

  /*  useEffect(() => {
    if (fetching) {
      getPosts({
        idLastUploadedPost: lastLoadedPostId,
        pageSize: 5,
        pageNumber: currentPage + 1,
        sortBy: "createdAt",
        sortDirection: "desc",
      })
        .unwrap()
        .then((res) => {
          if (res?.items) {
            setPosts(res.items);
            setCurrentPage((prevState) => prevState + 1);
            setTotalCount(res.totalCount);
          }
        })
        .catch((err) => toast.error(err.error))
        .finally(() => setFetching(false));
    }
  }, []);*/

  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };

  const postsImages = () => {
    return data?.items.map((i) => {
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
      {isLoading && <Loader />}
      {fetching && <Loader />}
    </>
  );
};
