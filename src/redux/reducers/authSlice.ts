import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth.api";
import { IUserMeResponseData } from "@/types/userTypes";

interface IInitialState {
  user: IUserMeResponseData | null;
  isAuth: boolean;
}

const initialState: IInitialState = {
  isAuth: false,
  user: null,
};
type LoginResponseType = {
  accessToken: string;
};

const { postLogin, loginWithGoogleOAuth, postLogout, getAuthMe } = authApi.endpoints;

const authReducerHandler = (state: IInitialState, action: PayloadAction<LoginResponseType>) => {
  sessionStorage.setItem("accessToken", action.payload.accessToken);
  state.isAuth = true;
};

const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(postLogin.matchFulfilled, authReducerHandler)
      .addMatcher(loginWithGoogleOAuth.matchFulfilled, authReducerHandler)
      .addMatcher(postLogout.matchFulfilled, (state) => {
        state.isAuth = false;
        sessionStorage.clear();
      })
      .addMatcher(getAuthMe.matchFulfilled, (state, action: PayloadAction<IUserMeResponseData>) => {
        state.isAuth = true;
        state.user = action.payload;
        sessionStorage.setItem("userId", JSON.stringify(action.payload.userId));
      });
    // .addMatcher(loginWithGitHubOAuth.matchFulfilled, authReducerHandler);
  },
});

export { authReducer, authActions };
