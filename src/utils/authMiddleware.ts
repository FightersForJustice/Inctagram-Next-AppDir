import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth.api';
import { setAccessToken } from '@/accessToken';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints?.login.matchFulfilled,

  effect: async (action, api) => {
    api.cancelActiveListeners();

    if (action.payload.accessToken) {
      setAccessToken(action.payload.accessToken);
    }
  },
});
