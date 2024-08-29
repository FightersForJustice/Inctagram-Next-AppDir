import { api } from '@/api/api';
import { DevicesResponse } from '@/api/profile.api';


export const publicProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublicUserProfile: builder.query<PublicProfileType, number>({
      query: userId => ({ url: `/public-profile/${userId}` }),
    }),
    getCountRegisterUser: builder.query<CountRegisterUser, void>({
      query: () => {
        return {
          url: `/public-user`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetPublicUserProfileQuery } = publicProfileApi

export type Avatars = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
}

export type PublicProfileType = {
  id: number;
  userName: string;
  aboutMe: string;
  avatars: Avatars[];
}

export type CountRegisterUser = {
  totalCount: number;
}