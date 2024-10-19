export type createPostOptionsType = {
  description: string;
  childrenMetadata: { uploadId: string }[];
};

export type createCommentOptionsType = {
  content: string;
  id?: number;
  commentId?: number;
};

export type createCommentLikeOptionsType = {
  commentId: number;
  postId: number;
  likeStatus: string;
};
