"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";

import s from "./Home.module.scss";
import { HomePagePost } from "./HomePagePost/HomePagePost";
import { PostsItem, useLazyGetPostsQuery } from "../../../api/posts.api";
import { Loader } from "../../../components/Loader/Loader";
import useScrollFetching from "../../../features/hooks/useScrollListener";

const Home = () => {
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [getPosts] = useLazyGetPostsQuery();
  const fetchingValue = useScrollFetching(100, fetching, setFetching);

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
  }, [fetchingValue]);

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
