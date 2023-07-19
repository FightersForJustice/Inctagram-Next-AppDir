import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let postsApi = createApi({
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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    postPostImage: builder.mutation<any, any>({
      query: (file: FormData) => {
        return {
          url: "posts/image",
          method: "POST",
          body: file,
        };
      },
    }),
    postPost: builder.mutation<PostResponse, PostDataPayload>({
      query: (post: PostDataPayload) => {
        return {
          url: "posts",
          method: "POST",
          body: post,
        };
      },
    }),
    getPosts: builder.query<GetAllPostsResponse, void>({
      query: () => {
        return {
          url: `posts/${sessionStorage.getItem("userId")}`,
          method: "GET",
        };
      },
    }),
    getPost: builder.query<any, number>({
      query: (postId: number) => {
        return {
          url: `posts/p/${postId}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    putPost: builder.mutation<any, PutPostPayloadData>({
      query: (payload: PutPostPayloadData) => {
        return {
          url: `posts/${payload.postId}`,
          method: "PUT",
          body: {
            description: payload.description,
          },
        };
      },
    }),
    deletePost: builder.mutation<any, number>({
      query: (postId: number) => {
        return {
          url: `posts/${postId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export type PostDataPayload = {
  description: string;
  childrenMetadata: [
    {
      uploadId: number;
    },
  ];
};
export type PostImageResponse = {
  images: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      uploadId: string;
    },
  ];
};
export type PostResponse = {
  id: number;
  description: string;
  location: string;
  images: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      uploadId: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
};

export type GetAllPostsResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: getPostResponse[];
};

export type getPostResponse = {
  id: number;
  description: string;
  location: string;
  images: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      uploadId: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
};

export type PutPostPayloadData = {
  description: string;
  postId: number;
};

export let {
  usePostPostImageMutation,
  useDeletePostMutation,
  usePutPostMutation,
  usePostPostMutation,
  useGetPostsQuery,
  useGetPostQuery,
} = postsApi;
