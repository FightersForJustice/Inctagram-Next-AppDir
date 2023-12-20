import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

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

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: false,
  tagTypes: ['Post'],
  endpoints: () => ({}),
});
