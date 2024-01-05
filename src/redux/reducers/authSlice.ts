import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth.api';
import { IUserMeResponseData } from '@/types/userTypes';

interface IInitialState {
  user: IUserMeResponseData | null;
  isAuth: boolean;
  accessToken: string;
}

const initialState: IInitialState = {
  isAuth: false,
  user: null,
  accessToken: '',
};
type LoginResponseType = {
  accessToken: string;
};

const { postLogin, loginWithGoogleOAuth, postLogout, getAuthMe } =
  authApi.endpoints;

const authReducerHandler = (
  state: IInitialState,
  action: PayloadAction<LoginResponseType>
) => {
  // sessionStorage.setItem('accessToken', action.payload.accessToken);
  state.isAuth = true;
};

const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<LoginResponseType>) => {
      state.accessToken = action.payload.accessToken;
    },
    postLogin: (state) => {
      state.isAuth = !state.isAuth;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase('postLogin', (state) => (state.isAuth = true));
    // .addMatcher(loginWithGoogleOAuth.matchFulfilled, authReducerHandler)
    // .addMatcher(postLogout.matchFulfilled, (state) => {
    //   state.isAuth = false;
    //   sessionStorage.clear();
    // })
    // .addMatcher(
    //   getAuthMe.matchFulfilled,
    //   (state, action: PayloadAction<IUserMeResponseData>) => {
    //     state.isAuth = true;
    //     state.user = action.payload;
    //     sessionStorage.setItem(
    //       'userId',
    //       JSON.stringify(action.payload.userId)
    //     );
    //   }
    // );
    // .addMatcher(loginWithGitHubOAuth.matchFulfilled, authReducerHandler);
  },
});

export { authReducer, authActions };
