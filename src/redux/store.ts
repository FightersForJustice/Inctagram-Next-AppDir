import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from '@/redux/reducers';
import { postReducer } from '@/redux/reducers/post/postReducer';
import { listenerMiddleware } from '@/utils/authMiddleware';
import { authReducer } from '@/redux/reducers/authSlice';
import { authApi } from '@/api/auth.api';
import { profileApi } from '@/api/profile.api';
import { postsApi } from '@/api/posts.api';
import { subscriptionsApi } from '@/api/subscriptions.api';
import { api } from '@/api/api';
import nextQueryApi from '@/api/api.next';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  post: postReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  [nextQueryApi.reducerPath]: nextQueryApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      listenerMiddleware.middleware,
      api.middleware,
      nextQueryApi.middleware,
    ]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
