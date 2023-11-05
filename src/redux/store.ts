
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { appReducer } from "@/redux/reducers";
import { postReducer } from "@/redux/reducers/post/postReducer";
import { listenerMiddleware } from "@/utils/authMiddleware";
import { authReducer } from "@/redux/reducers/authSlice";
import { authApi } from "@/api/auth.api";
import { profileApi } from "@/api/profile.api";
import { postsApi } from "@/api/posts.api";
import { subscriptionsApi } from "@/api/subscriptions.api";
import { api } from "@/api/api";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  post: postReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([listenerMiddleware.middleware, api.middleware]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
