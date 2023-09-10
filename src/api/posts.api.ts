import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/helpers/config";
import { ImageId } from "@/redux/reducers/post/postReducer";

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
    getAllPosts: builder.query<
      GetAllPosts,
      { idLastUploadedPost: number; pageSize: number; sortBy: string; sortDirection: string }
    >({
      query: ({ idLastUploadedPost, pageSize, sortBy, sortDirection }) => {
        return {
          url: `posts/all/${idLastUploadedPost}?pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    getUserPosts: builder.query<
      GetAllPosts,
      { idLastUploadedPost: number; pageSize: number; sortBy: string; sortDirection: string }
    >({
      query: ({ idLastUploadedPost, pageSize, sortBy, sortDirection }) => {
        return {
          url: `posts/user/${idLastUploadedPost}?pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
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
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
} = postsApi;

export type Image = {
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
  childrenMetadata: [{ uploadId: string }];
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

export type GetAllPosts = {
  totalCount: number;
  pageSize: number;
  items: PostsItem[];
};
