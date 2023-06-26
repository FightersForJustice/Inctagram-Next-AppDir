import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "api/auth.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
