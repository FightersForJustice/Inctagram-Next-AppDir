type Items = {
  id: number;
};

export const findMinId = (items: Items[]) => {
  if (items.length === 0) {
    return 0;
  }
  const minId = items.reduce(
    (min, post) => (post.id < min ? post.id : min),
    items[0].id
  );
  return minId;
};
