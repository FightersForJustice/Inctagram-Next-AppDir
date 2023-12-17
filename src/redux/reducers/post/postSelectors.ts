import { RootState } from '@/redux/store';

export const postImages = (state: RootState) => state.post.postImages;
export const postImagesIds = (state: RootState) => state.post.postImagesIds;
export const imagesGallery = (state: RootState) => state.post.imagesGallery;
