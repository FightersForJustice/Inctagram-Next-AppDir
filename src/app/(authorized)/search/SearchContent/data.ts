import {
  createFollowingOption,
  deleteFollowerOption,
  getUsersOptions,
} from '@/app/lib/actionOptions';
import { UsersDataType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async (
  accessToken: string | null,
  searchData: {
    search: string;
    pageSize?: number;
    pageNumber: number;
    cursor?: number;
  }
) => {
  const { search, cursor = 0, pageSize = 20, pageNumber } = searchData;
  const apiUrl =
    baseUrl +
    `users?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data: UsersDataType = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const followToUser = async (
  userId: number,
  accessToken: string | null
) => {
  const apiUrl = baseUrl + `users/following`;
  try {
    const response = await fetch(
      apiUrl,
      createFollowingOption(accessToken, userId)
    );
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    return response.ok;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const unfollowByUser = async (
  userId: number,
  accessToken: string | null
) => {
  const apiUrl = baseUrl + `users/follower/${userId}`;
  try {
    const response = await fetch(apiUrl, deleteFollowerOption(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    return response.ok;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
