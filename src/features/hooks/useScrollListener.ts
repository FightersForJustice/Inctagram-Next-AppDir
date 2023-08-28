import { useEffect } from "react";
import { calculateScrollValue } from "@/utils";

export const useScrollFetching = (
  threshold: number = 100,
  fetching: boolean,
  setFetching: (value: boolean) => void,
  page: number,
  postsAmount: number,
  totalCountPosts: number,
  pagesCount: number,
): boolean => {
  const onScroll = (e: Event) => {
    const target = e.target as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < threshold) {
      if (postsAmount + calculateScrollValue(pagesCount) > totalCountPosts) {
        setFetching(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [page, postsAmount, totalCountPosts, pagesCount]);

  return fetching;
};
