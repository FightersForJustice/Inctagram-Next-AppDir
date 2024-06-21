import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'react-easy-crop';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

const initialAppState: PostStateType = {
  postImages: [],
  changedImages: [],
  currentImageId: null,
  description: '',
};

const slice = createSlice({
  name: 'postReducer',
  initialState: initialAppState,
  reducers: {
    addImage(state, action: PayloadAction<ChangedImage[]>) {
      state.changedImages.push(...action.payload);
      action.payload.forEach((image) => {
        state.postImages.push({
          originalImage: image.originalImage,
          image: image.image,
          id: image.id,
        });
      });

      state.currentImageId = action.payload[action.payload.length - 1].id;
    },
    deleteImage(state, action: PayloadAction<{ id: string }>) {
      state.postImages = state.postImages.filter(
        (image) => image.id !== action.payload.id,
      );
      state.changedImages = state.changedImages.filter(
        (image) => image.id !== action.payload.id,
      );
    },
    clearPostState(state) {
      state.postImages = [];
      state.changedImages = [];
      state.currentImageId = null;
      state.description = '';
    },
    changeCurrentImage(state, action: PayloadAction<{ id: string }>) {
      state.currentImageId = action.payload.id;
    },
    setCropImage(state, action: PayloadAction<Omit<ChangedImage, 'filter' | 'aspectRatio' | 'originalImage'>>) {
      const targetImg = state.changedImages.find(
          (el) => el.id === action.payload.id
      );

      if (targetImg) {
        const index = state.changedImages.indexOf(targetImg);

        state.changedImages[index] = {
          ...targetImg,
          image: action.payload.image,
          croppedArea: action.payload.croppedArea,
        }
      }
    },
    setAspectRatio(state, action: PayloadAction<{ aspectRatio: AspectRatioType, id: string }>) {
      state.changedImages = state.changedImages.map(image => image.id === action.payload.id ? {
        ...image,
        aspectRatio: action.payload.aspectRatio,
      } : image);
    },
    setZoom(state, action: PayloadAction<{ zoom: number, id: string }>) {
      state.changedImages = state.changedImages.map(image => image.id === action.payload.id ? {
          ...image,
          zoom: action.payload.zoom,
        } :
        image);
    },
    setDescription(state, action: PayloadAction<{ description: string }>) {
      state.description = action.payload.description;
    },
    setImageFilter(
      state,
      action: PayloadAction<{ id: string, filter: string, image: string }>,
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
  originalImage: string;
};

export type ChangedImage = {
  aspectRatio: AspectRatioType
  croppedArea: Area | undefined;
  zoom: number;
  filter: string;
} & PostImage;

export type PostStateType = {
  postImages: PostImage[];
  changedImages: ChangedImage[];
  currentImageId: string | null;
  description: string;
};
