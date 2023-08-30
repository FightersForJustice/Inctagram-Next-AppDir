import { useEffect } from "react";

export const useScrollFetching = (
  threshold: number = 100,
  fetching: boolean,
  setFetching: (value: boolean) => void,
  postsLength: number,
  totalCount: number,
): boolean => {
  const onScroll = (e: Event) => {
    const target = e.target as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < threshold) {
      if (postsLength < totalCount) {
        setFetching(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [fetching, postsLength, totalCount]);

  return fetching;
};
