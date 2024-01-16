import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialAppState: AppSliceType = {
  isLoad: false,
};

const slice = createSlice({
  name: 'appSliceReducer',
  initialState: initialAppState,
  reducers: {
    setLoad(state, action: PayloadAction<{ isLoad: boolean }>) {
      state.isLoad = action.payload.isLoad;
    },
  },
});

export const appSliceReducer = slice.reducer;
export const appSliceActions = slice.actions;

export type AppSliceType = {
  isLoad: boolean;
};
