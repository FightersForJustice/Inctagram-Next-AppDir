import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialAppState: AppStateType = {
    userID: null,
};

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
      setUserID(state, action: PayloadAction<{userID: UserID}>) {
      state.userID = action.payload.userID;
    },
},
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;






export type UserID = number | null;

export type AppStateType = {
  userID: UserID;
};