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
