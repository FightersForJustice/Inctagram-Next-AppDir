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

export interface Post {
  id: number;
  ownerId: number;
  description: string;
  location: null | string;
  images: postImage[];
  createdAt: string;
  updatedAt: string;
  avatarOwner: string;
  owner: {
    firstName: null | string;
    lastName: null | string;
  };
}

export interface ApiResponsePosts {
  totalCount: number;
  pageSize: number;
  items: Post[];
}
