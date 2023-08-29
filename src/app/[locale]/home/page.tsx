"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { HomePagePost } from "./HomePagePost";
import { PostsItem, useLazyGetAllPostsQuery } from "@/api/posts.api";
import { useScrollFetching } from "@/features/hooks";

import s from "./Home.module.scss";
import { StatusCode } from "@/api/auth.api";

const Home: React.FC = () => {
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number>(0);

  const fetchingValue = useScrollFetching(100, fetching, setFetching);
  const [getPosts, { isLoading }] = useLazyGetAllPostsQuery();

  const loadMorePosts = () => {
    if (!isLoading) {
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
            setPosts([...posts, ...res.items]);
            setLastLoadedPostId(res.items[res.items.length - 1].id);
            setCurrentPage(currentPage + 1);
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
      pageNumber: currentPage + 1,
      sortBy: "createdAt",
      sortDirection: "desc",
    })
      .unwrap()
      .then((res) => {
        setPosts(res.items);
        setLastLoadedPostId(res.items[res.items.length - 1].id);
      })
      .catch((err) => {
        if (err.statusCode === StatusCode.noAddress) {
          toast.error("Error 404");
        }
        toast.error(err.error);
      });
  }, []);

  useEffect(() => {
    if (fetching) {
      loadMorePosts();
    }
  }, [fetchingValue]);

  const allPosts = posts.map((item) => <HomePagePost key={item.id} post={item} />);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = document.getElementById("wrapper");
      if (wrapper) {
        const scrolledHeight = window.innerHeight + window.scrollY;
        const wrapperHeight = wrapper.clientHeight + wrapper.offsetTop;

        if (scrolledHeight > wrapperHeight - 200) {
          setFetching(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={"wrapper"}>
          <Navigation pathname={pathname} paidAccount={false} />
          <div style={{ gridArea: "profile" }}>{allPosts}</div>
        </div>
      </div>
      {isLoading && <Loader />}
      {fetching && <Loader />}
    </>
  );
};

export default Home;
