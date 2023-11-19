import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { appActions } from '@/redux/reducers';
import { RootState } from '@/redux/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { accessToken, setAccessToken } from '@/accessToken';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const {
      app: { stopRefresh },
    } = <RootState>api.getState();

    if (!stopRefresh) {
      api.dispatch(appActions.setTokenRefresh(true));

      const res = await baseQuery(
        { url: 'auth/update-tokens', method: 'POST' },
        api,
        extraOptions
      );
      const data = <{ accessToken: string }>res.data;

      if (data) {
        setAccessToken(data.accessToken);
        toast.success('Welcome back!');
        result = await baseQuery(args, api, extraOptions);
        api.dispatch(appActions.setTokenIsActive(true));
      } else {
        api.dispatch(appActions.setTokenIsActive(false));
      }
    }

    api.dispatch(appActions.setTokenRefresh(false));
  }
  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReAuth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Post'],
  endpoints: () => ({}),
});
