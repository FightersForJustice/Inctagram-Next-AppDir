import { api } from '@/api/api';

export const publicPostApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPost: builder.query<
      PostItem,
      { postId: number; userId: string | string[] | undefined }
    >({
      query: data => ({
        params: { userId: data.userId },
        url: `/public-posts/${data.postId}`,
      }),
    }),
  }),
});

export const {
useGetPublicPostQuery
} = publicPostApi;


export type Images = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
}

export type Owner = {
  firstName: string;
  lastName: string;
}

export type PostItem = {
  id: number;
  userName: string;
  description: string | null;
  location: string | null;
  images: Images[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string | null
  owner: Owner;
  likesCount: number;
}
