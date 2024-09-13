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
}

export interface ApiResponsePosts {
  totalCount: number;
  pageSize: number;
  items: PostType[];
}

export type UserDataType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatars: Array<Avatar & { createdAt: string }>;
  createdAt: string;
};
