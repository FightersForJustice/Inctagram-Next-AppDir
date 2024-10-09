import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialAppState: ApiResponsePosts = {
  totalCount: 0,
  pageSize: 0,
  totalUsers: 0,
  items: [],
};

const slice = createSlice({
  name: 'ProfilePostReducer',
  initialState: initialAppState,
  reducers: {
    addItemsRequest: (state, action: PayloadAction<Items[]>) => {
      state.items = [...action.payload];
    },
    addItems: (state, action: PayloadAction<Items[]>) => {
      state.items.push(...action.payload);
    },
    addFirstItems: (state, action: PayloadAction<Items[]>) => {
      state.items.unshift(...action.payload);
    },
    removeItemById: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemById: (
      state,
      action: PayloadAction<{ postId: number; textareaValue: string }>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.postId
          ? { ...item, description: action.payload.textareaValue }
          : item
      );
    },
    updateLikesById: (
      state,
      action: PayloadAction<{ postId: number; isLiked: boolean, likesCount: number }>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.postId
          ? { ...item, isLiked: action.payload.isLiked, likesCount: action.payload.likesCount }
          : item
      );
    },
  },
});
export const ProfilePostReducer = slice.reducer;
export const ProfilePostActions = slice.actions;

export type ApiResponsePosts = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: Items[];
};

export type Items = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: ImageType[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
  likesCount: number;
  isLiked: boolean;
};

export type ImageType = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type Owner = {
  firstName: string;
  lastName: string;
};
