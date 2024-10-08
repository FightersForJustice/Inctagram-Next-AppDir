export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

export type UserProfile = {
  id: number;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  dateOfBirth: string | null;
  aboutMe: string | null;
  createdAt: string;
  avatars: Avatar[];
};

export interface postImage {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  uploadId: string;
}

export interface PostType {
  id: number;//
  userName: string;
  ownerId: number;//
  description: string;//
  location: string;
  images: postImage[];
  createdAt: string;//
  updatedAt: string;//
  avatarOwner: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  isLiked: boolean;
  likesCount: number;
}

export interface ApiResponsePosts {
  totalCount: number;
  pageSize: number;
  items: PostType[];
}

export type UsersDataType = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: UserType[];
};

export type UserType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatars: Array<Avatar & { createdAt: string }>;
  createdAt: string;
};

export type UserFollowingDataType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: Array<Avatar & { createdAt: string }>;
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
};

export type GetFollowersDataType = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: FollowerType[];
};

export type FollowerType = {
  id: number;
  userId: number;
  userName: string;
  avatars: Array<Avatar & { createdAt: string }>;
  createdAt: string;
  isFollowing: boolean;
  isFollowedBy: boolean;
};

export type PostLikesDataType = {
  isLiked: boolean;
  items: FollowerType[]
  nextCursor: null | number;
  page: number;
  pageSize: number,
  pagesCount: number;
  prevCursor: number;
  totalCount: number,
};
