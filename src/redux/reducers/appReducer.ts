import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialAppState: AppStateType = {
    userID: null,
    email: null
};

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
      setUserData(state, action: PayloadAction<{userID: UserID, email: Email}>) {
      state.userID = action.payload.userID;
      state.email = action.payload.email
    },
},
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;






export type UserID = number | null;
export type Email = string | null;

export type AppStateType = {
  userID: UserID
  email:Email
};