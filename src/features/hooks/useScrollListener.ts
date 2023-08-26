import { useEffect } from "react";

const useScrollFetching = (
  threshold: number = 100,
  fetching: boolean,
  setFetching: (value: boolean) => void,
  pageSize: number,
  postsAmount: number,
  totalCountPosts: number,
): boolean => {
  const onScroll = (e: Event) => {
    const target = e.target as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < threshold) {
      if (pageSize + postsAmount > totalCountPosts) {
        setFetching(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pageSize, postsAmount, totalCountPosts]);

  return fetching;
};

export default useScrollFetching;
