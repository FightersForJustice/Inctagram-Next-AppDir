import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialAppState: Posts = {
  items: [],
};

const slice = createSlice({
  name: 'ProfilePostReducer',
  initialState: initialAppState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
export const ProfilePostReducer = slice.reducer;
export const ProfilePostActions = slice.actions;

export type Posts = {
  items: Item[];
};
export type Item = {
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
