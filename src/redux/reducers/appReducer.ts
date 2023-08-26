import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAppState: AppStateType = {
  userID: null,
  email: null,
  userName: null,
};

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setUserData(state, action: PayloadAction<{ userID: UserID; email: Email; userName: UserName }>) {
      state.userID = action.payload.userID;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type UserID = number | null;
export type Email = string | null;
export type UserName = string | null;

export type AppStateType = {
  userID: UserID;
  email: Email;
  userName: UserName;
};