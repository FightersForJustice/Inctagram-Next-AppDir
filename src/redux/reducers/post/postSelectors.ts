import { RootState } from '@/redux/store';

export const postImages = (state: RootState) => state.post.postImages;
export const postImageById = (state: RootState, id: string) => {
  return state.post.postImages.find((image) => image.id === id);
};
export const changedImageById = (state: RootState, id?: string) => {
  if (!id) {
    return null;
  }

  const image = state.post.changedImages.find((image) => image.id === id);

  if (image) {
    return { image: image.image, id: image.id };
  }

  return null;
};
