import { UserID } from "@/redux/reducers/appReducer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/helpers/config";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    uploadPostImage: builder.mutation<UploadImageResponse, FormData>({
      query: (file) => {
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
      invalidatesTags: ["Post"],
    }),
    deletePostImage: builder.mutation({
      query: (uploadId: string) => {
        return {
          url: `posts/image/${uploadId}`,
          method: "DELETE",
        };
      },
    }),
    getPost: builder.query<PostResponse, number>({
      query: (postId) => {
        return {
          url: `posts/p/${postId}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation<any, { postId: number; description: string }>({
      query: (args) => {
        return {
          url: `posts/${args.postId}`,
          method: "PUT",
          body: {
            description: args.description,
          },
        };
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId: number) => {
        return {
          url: `posts/${postId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Post"],
    }),
    getPostsPagination: builder.query<PostsWithPagination, { userId: string; pageNumber: number }>({
      query: ({ userId, pageNumber }) => {
        return {
          url: `posts/user?pageNumber=${pageNumber}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    getPosts: builder.query<PostsWithPagination, { pageNumber: number; userID: UserID }>({
      query: ({ pageNumber, userID }) => {
        return {
          url: `posts/user?pageNumber=${pageNumber}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
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
  useLazyGetPostsPaginationQuery,
  useGetPostsPaginationQuery,
  useLazyGetPostsQuery,
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

export type PostsItem = {
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
  items: PostsItem[];
};
