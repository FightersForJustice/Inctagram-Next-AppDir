import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";
import { toast } from "react-toastify";

const initialAppState: postStateType = {
  //@ts-ignore
  postImagesIds: [],
  postImages: [],
  imagesGallery: [],
};

const slice = createSlice({
  name: "postReducer",
  initialState: initialAppState,
  reducers: {
    addImageId(state, action: PayloadAction<{ uploadId: string }>) {
      state.postImagesIds.push(action.payload);
      console.log(state.postImagesIds);
    },
    addImage(state, action: PayloadAction<ImageType>) {
      if (state.postImages.findIndex((i) => i.id === action.payload.id) > -1) {
        console.log("you want added image which yet have");
        return;
      }

      state.postImages = [...state.postImages, action.payload];

      state.imagesGallery.push(action.payload);
      console.log(state.postImages);
    },
    changeImage(state, action: PayloadAction<ImageType>) {
      const index = state.postImages.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.postImages[index] = action.payload;
    },
    removeImage(state, action: PayloadAction<string>) {
      const index = state.postImages.findIndex((image) => image.id === action.payload);
      if (index !== -1) state.postImages.splice(index, 1);
    },
    removeAllImages(state) {
      state.postImages = [];
      console.log("Images was deleted");
    },
    addImageToPostGallery(state, action: PayloadAction<ImageType>) {
      console.log(state.imagesGallery);
      if (state.imagesGallery.length >= 10) {
        toast.error("Max images count is 10!");
        return;
      }
      state.imagesGallery.push(action.payload);
      console.log(state.imagesGallery);
    },
    changeImageFromPostGallery(state, action: PayloadAction<ImageType>) {
      const index = state.imagesGallery.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.imagesGallery[index] = action.payload;
    },
    removeGalleryImage(state, action: PayloadAction<{ id: string }>) {
      const index = state.imagesGallery.findIndex((image) => image.id === action.payload.id);
      if (index !== -1) state.imagesGallery.splice(index, 1);
    },
    removeAllGalleryImages(state) {
      state.imagesGallery = [];
      console.log("Images was deleted");
    },
  },
});

export const postReducer = slice.reducer;
export const postActions = slice.actions;

export type ImageId = { uploadId: string };

export type postStateType = {
  postImagesIds: [{ uploadId: string }];
  postImages: ImageType[];
  imagesGallery: ImageType[];
};
