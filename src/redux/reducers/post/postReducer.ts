import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageStateType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";
import { toast } from "react-toastify";

const initialAppState: PostStateType = {
  postImagesIds: [],
  postImages: [],
  imagesGallery: [],
  somePostChanged: false,
  cropAspectRatio: 1,
};

const slice = createSlice({
  name: "postReducer",
  initialState: initialAppState,
  reducers: {
    addImageId(state, action: PayloadAction<IUploadImageId>) {
      state.postImagesIds.push(action.payload);
    },
    removeImageIds(state) {
      state.postImagesIds = [];
    },
    addImage(state, action: PayloadAction<any>) {
      if (state.postImages.findIndex((i) => i.id === action.payload.id) > -1) {
        return;
      }
      state.postImages = [...state.postImages, action.payload];
      state.imagesGallery.push(action.payload);
    },
    changeImage(state, action: PayloadAction<ImageStateType>) {
      const index = state.postImages.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.postImages[index] = action.payload;
    },
    setImageFilter(state, action: PayloadAction<{ image: string; filter: string }>) {
      const index = state.postImages.findIndex((image) => image.image === action.payload.image);
      if (index !== -1) {
        state.postImages[index] = {
          image: action.payload.image,
          id: state.postImages[index].id,
          filter: action.payload.filter,
        };
      }
    },
    removeImage(state, action: PayloadAction<string>) {
      const index = state.postImages.findIndex((image) => image.id === action.payload);
      if (index !== -1) state.postImages.splice(index, 1);
    },
    removeAllImages(state) {
      state.postImages = [];
    },
    addImageToPostGallery(state, action: PayloadAction<ImageStateType>) {
      if (state.imagesGallery.length >= 10) {
        toast.error("Max images count is 10!");
        return;
      }
      state.imagesGallery.push(action.payload);
    },
    changeImageFromPostGallery(state, action: PayloadAction<ImageStateType>) {
      const index = state.imagesGallery.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.imagesGallery[index] = action.payload;
    },
    removeGalleryImage(state, action: PayloadAction<{ id: string }>) {
      const index = state.imagesGallery.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.imagesGallery.splice(index, 1);
    },
    removeAllGalleryImages(state) {
      state.imagesGallery = [];
    },
    somePostIsChanged(state, action: PayloadAction<boolean>) {
      state.somePostChanged = action.payload;
    },
    setCropAspectRatio(state, action: PayloadAction<number>) {
      state.cropAspectRatio = action.payload;
    },
  },
});
export const postReducer = slice.reducer;
export const postActions = slice.actions;

export type ImageId = { uploadId: string };

export interface IUploadImageId {
  uploadId: string;
}

export type PostStateType = {
  postImagesIds: IUploadImageId[];
  postImages: ImageStateType[];
  imagesGallery: ImageStateType[];
  somePostChanged: boolean;
  cropAspectRatio: number;
};
