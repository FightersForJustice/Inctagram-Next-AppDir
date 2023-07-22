import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram-api.vercel.app/api/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    putProfile: builder.mutation<any, PutProfileBody>({
      query: (profile: PutProfileBody) => {
        return {
          url: "users/profile",
          method: "PUT",
          body: {
            ...profile,
          },
        };
      },
    }),
    getProfile: builder.query<GetResponse, void>({
      query: () => {
        return {
          url: "users/profile",
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    postProfileAvatar: builder.mutation<PostProfileAvatar, FormData>({
      query: (file: FormData) => {
        return {
          url: "users/profile/avatar",
          method: "POST",
          body: file,
        };
      },
    }),
    deleteProfileAvatar: builder.mutation<any, void>({
      query: () => {
        return {
          url: "users/profile/avatar",
          method: "DELETE",
        };
      },
    }),
    deleteProfile: builder.mutation<void, void>({
      query: () => {
        return {
          url: "users/profile",
          method: "DELETE",
        };
      },
    }),
  }),
});

export let {
  usePutProfileMutation,
  useGetProfileQuery,
  usePostProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
  useDeleteProfileMutation,
  useLazyGetProfileQuery,
} = profileApi;

export type PostProfileAvatar = {
  avatars: Avatar[];
};

export type PutProfileBody = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: Date;
  aboutMe: string | undefined;
};

export interface GetResponse {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: Date;
  aboutMe: string;
  avatars: Avatar[];
}

export interface Avatar {
  url: string;
  width: number;
  height: number;
  fileSize: number;
}
