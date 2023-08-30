import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/helpers";

export let profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
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
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  city: string | null | undefined;
  dateOfBirth: Date;
  aboutMe: string | undefined | null;
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
