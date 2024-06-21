import { RootState } from '@/redux/store';

export const postImages = (state: RootState) => state.post.postImages;
export const changedImages = (state: RootState) => state.post.changedImages;
export const postImageById = (state: RootState, id: string) => {
  return state.post.postImages.find((image) => image.id === id);
};

export const changedImageById = (state: RootState, id: string) => {
  return state.post.changedImages.find((image) => image.id === id);
};
