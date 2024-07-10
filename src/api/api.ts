import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { accessToken } from '@/accessToken';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  // baseUrl: 'https://inctagram.work/api/v1/',
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("accessToken");
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
