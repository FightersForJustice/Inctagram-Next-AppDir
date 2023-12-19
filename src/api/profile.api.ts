import { api } from '@/api/api';

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    putProfile: builder.mutation<any, PutProfileBody>({
      query: (profile: PutProfileBody) => {
        return {
          url: 'users/profile',
          method: 'PUT',
          body: {
            ...profile,
          },
        };
      },
    }),
    getProfile: builder.query<GetResponse, void>({
      query: () => {
        const userId = sessionStorage.getItem('userId');
        return {
          url: `users/profile/${userId}`,
          method: 'GET',
        };
      },
    }),
    postProfileAvatar: builder.mutation<PostProfileAvatar, FormData>({
      query: (file: FormData) => {
        return {
          url: 'users/profile/avatar',
          method: 'POST',
          body: file,
        };
      },
    }),
    deleteProfileAvatar: builder.mutation<any, void>({
      query: () => {
        return {
          url: 'users/profile/avatar',
          method: 'DELETE',
        };
      },
    }),
    deleteProfile: builder.mutation<void, void>({
      query: () => {
        return {
          url: 'users/profile',
          method: 'DELETE',
        };
      },
    }),
    getDeviceSessions: builder.query<DevicesResponse[], void>({
      query: () => {
        return {
          url: `sessions`,
          method: 'GET',
        };
      },
    }),
    deleteSessionsTerminateAll: builder.mutation<void, void>({
      query: () => {
        return {
          url: 'sessions/terminate-all',
          method: 'DELETE',
        };
      },
    }),
    deleteSessionsDevice: builder.mutation<void, string>({
      query: (deviceId: string) => {
        return {
          url: `sessions/${deviceId}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  usePutProfileMutation,
  useGetProfileQuery,
  usePostProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
  useDeleteProfileMutation,
  useLazyGetProfileQuery,
  useGetDeviceSessionsQuery,
  useDeleteSessionsDeviceMutation,
  useDeleteSessionsTerminateAllMutation,
} = profileApi;

export type PostProfileAvatar = {
  avatars: Avatar[];
};

export type PutProfileBody = {
  userName: string;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  city: string | null | undefined;
  dateOfBirth: string;
  aboutMe: string | undefined | null;
};

export interface GetResponse {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: Avatar[];
}

export interface Avatar {
  url: string;
  width: number;
  height: number;
  fileSize: number;
}
export interface DevicesResponse {
  deviceId: number;
  ip: string;
  lastActive: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  osName: string;
  osVersion: string;
  deviceType: string;
}
