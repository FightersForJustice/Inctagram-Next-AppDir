import { ImageStateType } from '@/app/(authorized)/CreatePost/CreatePost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialAppState: PostStateType = {
  postImagesIds: [],
  postImages: [],
  imagesGallery: [],
  cropAspectRatio: 1,
  currentImage: null,
};

const slice = createSlice({
  name: 'postReducer',
  initialState: initialAppState,
  reducers: {
    addImageId(state, action: PayloadAction<IUploadImageId>) {
      state.postImagesIds.push(action.payload);
    },
    removeImageIds(state) {
      state.postImagesIds = [];
    },
    addImage(state, action: PayloadAction<ImageStateType[]>) {
      state.postImages.push(...action.payload);
      state.imagesGallery.push(...action.payload);

      if (state.currentImage) {
        state.currentImage = action.payload[action.payload.length - 1];
      }
      console.log('images add');
    },
    changeCurrentImage(state, action: PayloadAction<ImageStateType>) {
      state.currentImage = action.payload;
    },
    changeImage(state, action: PayloadAction<ImageStateType>) {
      state.imagesGallery.map((image) =>
        image.id === action.payload.id ? action.payload : image
      );
    },
    setImageFilter(
      state,
      action: PayloadAction<{ image: string; filter: string }>
    ) {
      const index = state.postImages.findIndex(
        (image) => image.image === action.payload.image
      );
      if (index !== -1) {
        state.postImages[index] = {
          image: action.payload.image,
          id: state.postImages[index].id,
          filter: action.payload.filter,
        };
      }
    },
    removeImage(state, action: PayloadAction<string>) {
      const index = state.postImages.findIndex(
        (image) => image.id === action.payload
      );
      if (index !== -1) state.postImages.splice(index, 1);
      if (state.imagesGallery.length < 10) {
      }
    },
    removeAllImages(state) {
      state.postImages = [];
    },
    addImageToPostGallery(state, action: PayloadAction<ImageStateType>) {
      state.imagesGallery.push(action.payload);
    },
    changeImageFromPostGallery(state, action: PayloadAction<ImageStateType>) {
      const index = state.imagesGallery.findIndex(
        (image) => image.id === action.payload.id
      );
      if (index !== -1) state.imagesGallery[index] = action.payload;
    },
    removeGalleryImage(state, action: PayloadAction<{ id: string }>) {
      const index = state.imagesGallery.findIndex(
        (image) => image.id === action.payload.id
      );
      if (index !== -1) state.imagesGallery.splice(index, 1);
    },
    removeAllGalleryImages(state) {
      state.imagesGallery = [];
    },
    setCropAspectRatio(state, action: PayloadAction<number>) {
      state.cropAspectRatio = action.payload;
    },
  },
});
export const postReducer = slice.reducer;
export const postActions = slice.actions;

export interface IUploadImageId {
  uploadId: string;
}

export type PostStateType = {
  postImagesIds: IUploadImageId[];
  postImages: ImageStateType[];
  imagesGallery: ImageStateType[];
  cropAspectRatio: number;
  currentImage: ImageStateType | null;
};
