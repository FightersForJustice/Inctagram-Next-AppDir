import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth.api";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints?.postLogin.matchFulfilled,

  effect: async (action, api) => {
    api.cancelActiveListeners();

    if (action.payload.accessToken) {
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    }
  },
});
