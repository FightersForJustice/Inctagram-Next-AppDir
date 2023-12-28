type postsDataType = {
  items: item[];
};
type item = {
  id: number;
};

export const findMinId = (postsData: postsDataType): number | undefined => {
  if (postsData.items.length === 0) {
    return 0;
  }
  const minId = postsData.items.reduce(
    (min, post) => (post.id < min ? post.id : min),
    postsData.items[0].id
  );
  return minId;
};
