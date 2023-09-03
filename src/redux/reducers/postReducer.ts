import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";

const initialAppState: postStateType = {
  postImagesIds: [],
  postImages: [],
};

const slice = createSlice({
  name: "postReducer",
  initialState: initialAppState,
  reducers: {
    addImageId(state, action: PayloadAction<{ uploadId: string }>) {
      state.postImagesIds = [...state.postImagesIds, { uploadId: action.payload.uploadId }];
      console.log(state.postImagesIds);
    },
    addImage(state, action: PayloadAction<ImageType>) {
      state.postImages = [...state.postImages, action.payload];
      console.log(state.postImages);
    },
  },
});

export const postReducer = slice.reducer;
export const postActions = slice.actions;

export type ImageId = { uploadId: string };

export type postStateType = {
  postImagesIds: ImageId[];
  postImages: ImageType[];
};
