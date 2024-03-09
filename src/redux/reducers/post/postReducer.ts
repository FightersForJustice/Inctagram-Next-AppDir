import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'react-easy-crop';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

const initialAppState: PostStateType = {
  postImages: [],
  changedImages: [],
  currentImageId: null,
  aspectRatio: AspectRatioType.one,
  zoom: 1,
};

const slice = createSlice({
  name: 'postReducer',
  initialState: initialAppState,
  reducers: {
    addImage(state, action: PayloadAction<PostImage[]>) {
      state.postImages.push(...action.payload);
      action.payload.forEach((image) => {
        state.changedImages.push({
          image: image.image,
          id: image.id,
          filter: '',
          croppedArea: null,
        });
      });

      if (!state.currentImageId) {
        state.currentImageId = action.payload[action.payload.length - 1].id;
      }
    },
    deleteImage(state, action: PayloadAction<{ id: string }>) {
      state.postImages = state.postImages.filter(
        (image) => image.id !== action.payload.id
      );
      state.changedImages = state.changedImages.filter(
        (image) => image.id !== action.payload.id
      );
    },
    clearPostState(state) {
      state.postImages = [];
      state.changedImages = [];
      state.currentImageId = null;
    },
    changeCurrentImage(state, action: PayloadAction<{ id: string }>) {
      state.currentImageId = action.payload.id;
    },
    setCropImage(state, action: PayloadAction<Omit<ChangedImage, 'filter'>>) {
      state.changedImages.map((image) => {
        if (image.id === action.payload.id) {
          image.image = action.payload.image;
          image.croppedArea = action.payload.croppedArea;

          return image;
        }

        return image;
      });
    },
    setAspectRatio(state, action: PayloadAction<AspectRatioType>) {
      state.aspectRatio = action.payload;
    },
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
    setImageFilter(
      state,
      action: PayloadAction<Omit<ChangedImage, 'croppedArea'>>
    ) {
      state.changedImages.map((image) => {
        if (image.id === action.payload.id) {
          image.image = action.payload.image;
          image.filter = action.payload.filter;

          return image;
        }

        return image;
      });
    },
  },
});
export const postReducer = slice.reducer;
export const postActions = slice.actions;

export interface IUploadImageId {
  uploadId: string;
}

export type PostImage = {
  id: string;
  image: string;
};

export type ChangedImage = {
  croppedArea: Area | null;
  filter: string;
} & PostImage;

export type PostStateType = {
  postImages: PostImage[];
  changedImages: ChangedImage[];
  currentImageId: string | null;
  aspectRatio: AspectRatioType;
  zoom: number;
};
