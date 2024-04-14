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
  images: Image[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
};

export type Image = {
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
