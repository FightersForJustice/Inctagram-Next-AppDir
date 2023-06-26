import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export let authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://inctagram-api.vercel.app/api/" }),
  endpoints: (builder) => ({
    postAuthorization: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: "auth/registration",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export let { usePostAuthorizationMutation } = authApi;
