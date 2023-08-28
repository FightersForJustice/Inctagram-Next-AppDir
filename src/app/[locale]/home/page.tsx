"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";
import { toast } from "react-toastify";
import { StatusCode } from "@/api/auth.api";
import { useSelector } from "react-redux";
import { UserID } from "@/redux/reducers/appReducer";
import { RootState } from "@/redux/store";
import { Loader } from "@/components/Loader";
import { HomePagePost } from "./HomePagePost";
import { PostsItem, useLazyGetPostsQuery } from "@/api/posts.api";
import { useScrollFetching } from "@/features/hooks";

import s from "./Home.module.scss";

const Home = () => {
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCountPosts, setTotalCountPosts] = useState(1);
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPosts, setCurrentPosts] = useState<PostsItem[]>([]);
  const userID = useSelector<RootState, UserID>((state) => state.app.userID);

  const fetchingValue = useScrollFetching(
    100,
    fetching,
    setFetching,
    page,
    currentPosts.length,
    totalCountPosts,
    pagesCount,
  );
  const [getPosts, { isLoading }] = useLazyGetPostsQuery();

  useEffect(() => {
    getPosts({ pageNumber: currentPage, userID })
      .unwrap()
      .then((res) => {
        setPosts(res.items);
        setPagesCount(res.pagesCount);
        setTotalCountPosts(res.totalCount);
        setCurrentPosts(res.items);
        setPage(res.page);
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
      getPosts({ pageNumber: currentPage, userID })
        .unwrap()
        .then((res) => {
          if (res?.items) {
            setPosts([...posts, ...res.items]);
            setCurrentPage((prevState) => prevState + 1);
            setPage(res.page);
            setPagesCount(res.pagesCount);
            setCurrentPosts(res.items);
          }
        })
        .catch((err) => toast.error(err.error))
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
      {isLoading && <Loader />}
      {fetching && <Loader />}
    </>
  );
};

export default Home;
