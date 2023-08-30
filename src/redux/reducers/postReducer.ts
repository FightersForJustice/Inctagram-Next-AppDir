// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
// const initialAppState: postStateType = {
//   postImages: [],
// };
//
// interface Images {
//   headerText: string | null;
//   subText: string;
//   image: string;
// }
// const slice = createSlice({
//   name: "postReducer",
//   initialState: initialAppState,
//   reducers: {
//     addImage(state, action: PayloadAction<{ image: string; subText: string; headerText: string }>) {
//       state.postImages.push(action.payload);
//     },
//   },
// });
//
// export const postReducer = slice.reducer;
// export const postActions = slice.actions;
//
// export type UserID = number | null;
// export type Email = string | null;
// export type UserName = string | null;
//
// export type postStateType = {
//   postImages: Images[];
// };
