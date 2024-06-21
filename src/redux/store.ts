import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from '@/api/auth.api';
import { appReducer } from '@/redux/reducers';
import { postReducer } from '@/redux/reducers/post/postReducer';
import { listenerMiddleware } from '@/utils/authMiddleware';
// import { profileApi } from '@/api/profile.api';
// import { postsApi } from '@/api/posts.api';
// import { subscriptionsApi } from '@/api/subscriptions.api';
import { api } from '@/api/api';
import { ProfilePostReducer } from './reducers/MyProfile/ProfilePostReducer';

const rootReducer = combineReducers({
  app: appReducer,
  post: postReducer,
  ProfilePost: ProfilePostReducer,
  [authApi.reducerPath]: authApi.reducer,
  // [profileApi.reducerPath]: profileApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      listenerMiddleware.middleware,
      api.middleware,
    ]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
