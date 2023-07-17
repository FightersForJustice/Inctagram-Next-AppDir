import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
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
  endpoints: (builder) => ({
    uploadPostImage: builder.mutation<UploadImageResponse, File>({
      query: (file: File) => {
        return {
          url: "posts/image",
          method: "POST",
          body: file,
        };
      },
    }),
    createPost: builder.mutation<PostResponse, CreatePostRequest>({
      query: (data) => {
        return {
          url: "posts",
          method: "POST",
          body: data,
        };
      },
    }),
    deletePostImage: builder.mutation({
      query: (uploadId: string) => {
        return {
          url: `posts/image/${uploadId}`,
          method: "DELETE",
        };
      },
    }),
    getPost: builder.query<PostResponse, string>({
      query: (postId) => {
        return {
          url: `posts/p/${postId}`,
          method: "GET",
        };
      },
    }),
    updatePost: builder.mutation<any, { postId: string; description: string }>({
      query: (args) => {
        return {
          url: `posts/${args.postId}`,
          method: "PUT",
          body: {
            description: args.description,
          },
        };
      },
    }),
    deletePost: builder.mutation({
      query: (postId: string) => {
        return {
          url: `posts/${postId}`,
          method: "DELETE",
        };
      },
    }),
    getPostsPagination: builder.query<PostsWithPagination, string>({
      query: (userId) => {
        return {
          url: `posts/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useUploadPostImageMutation,
  useCreatePostMutation,
  useDeletePostImageMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsPaginationQuery,
} = postsApi;

type Image = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  uploadId: string;
};

export type UploadImageResponse = {
  images: Image[];
};

export type CreatePostRequest = {
  description: string;
  childrenMetadata: [
    {
      uploadId: string;
    },
  ];
};

export type PostResponse = {
  id: number;
  description: string;
  location: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
};

export type PostsWithPagination = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: [
    {
      id: number;
      description: string;
      location: string;
      images: Image[];
      createdAt: string;
      updatedAt: string;
    },
  ];
};
