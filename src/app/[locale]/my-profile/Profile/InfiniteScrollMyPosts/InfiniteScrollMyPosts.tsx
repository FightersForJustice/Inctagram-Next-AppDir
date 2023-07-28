import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../../../../../components/Loader/Loader";
import { PostsItem, useLazyGetPostsPaginationQuery } from "../../../../../api/posts.api";
import { GetResponse } from "../../../../../api/profile.api";

type Props = {
  userData: GetResponse;
  setOpen: (value: boolean) => void;
  setSelectedPost: (postId: number) => void;
};

export const InfiniteScrollMyPosts: React.FC<Props> = ({ setSelectedPost, setOpen, userData }) => {
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [getPosts, { isSuccess }] = useLazyGetPostsPaginationQuery();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (fetching && userId) {
      getPosts(userId)
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
  }, [fetching]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = (e: Event) => {
    const target = e.target as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  };

  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };

  const postsImages = () => {
    return isSuccess ? (
      posts.map((i) => {
        if (i.images[0])
          return (
            <Image
              src={i.images[0].url ? i.images[0].url : "/img/profile/posts/post1.png"}
              alt={"post"}
              width={234}
              height={228}
              key={i.id}
              onClick={() => openPostHandler(i.id)}
            />
          );
      })
    ) : (
      <Loader />
    );
  };

  return <>{postsImages()}</>;
};
