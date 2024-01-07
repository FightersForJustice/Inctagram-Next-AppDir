export type UserProfileResponse = {
    id: number;
    userName: string;
    firstName: string | null;
    lastName: string | null;
    city: string | null;
    dateOfBirth: string | null;
    aboutMe: string | null;
    createdAt: string;
    avatars: string[];
};
