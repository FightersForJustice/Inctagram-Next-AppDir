"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";

import s from "./Home.module.scss";
import { HomePagePost } from "./HomePagePost/HomePagePost";
import { PostsItem, useLazyGetPostsQuery } from "../../../api/posts.api";
import { Loader } from "../../../components/Loader/Loader";

const Home = () => {
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [getPosts] = useLazyGetPostsQuery();

  useEffect(() => {
    getPosts(currentPage);
  }, []);

  useEffect(() => {
    if (fetching) {
      getPosts(currentPage)
        .unwrap()
        .then((res) => {
          if (res?.items) {
            setPosts([...posts, ...res.items]);
            setCurrentPage((prevState) => prevState + 1);
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

  const allPosts = posts.map((item) => {
    return <HomePagePost key={item.id} post={item} />;
  });

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper} id={"wrapper"}>
          <Navigation pathname={pathname} paidAccount={false} />
          <div style={{ gridArea: "profile" }}>{allPosts}</div>
        </div>
      </div>
      {fetching && <Loader />}
    </>
  );
};

export default Home;
