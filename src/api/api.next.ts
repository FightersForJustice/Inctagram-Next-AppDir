import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type LoginParamsData = {
  email: string;
  password: string;
};
type ServerLoginResponse = {
  refreshToken?: string;
  accessToken?: string;
};
const nextQueryApi = createApi({
  reducerPath: 'apiNext',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login2: builder.mutation<ServerLoginResponse, LoginParamsData>({
      query: (credentials) => ({
        url: `${process.env.NEXT_PUBLIC_URL}api/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLogin2Mutation } = nextQueryApi;

export default nextQueryApi;
