import { api } from '@/api/api';
import { Avatar } from '@/api/profile.api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      GetUsers,
      {
        search: string;
        pageSize?: number;
        pageNumber?: number;
        cursor?: number;
      }
    >({
      query: ({ search, pageSize = 12, pageNumber = 1, cursor = 0 }) => {
        return {
          url: `users?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

export type GetUsers = {
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
