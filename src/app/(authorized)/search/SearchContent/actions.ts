import { getUsersOptions } from '@/app/lib/actionOptions';
import { accessToken } from '@/utils/serverActions';
import {
  GetFollowersDataType,
  UserFollowingDataType,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserInfo = async (userName: string) => {
  const apiUrl = baseUrl + `users/${userName}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken()));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data: UserFollowingDataType = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getUserFollowers = async (
  userName: string,
  search: string,
  pageSize: number = 12,
  pageNumber: number = 1,
  cursor: number = 0
) => {
  const apiUrl =
    baseUrl +
    `users/${userName}/followers?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken()));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data: GetFollowersDataType = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getUserFollowing = async (
  userName: string,
  search: string,
  pageSize: number = 12,
  pageNumber: number = 1,
  cursor: number = 0
) => {
  const apiUrl =
    baseUrl +
    `users/${userName}/following?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken()));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data: GetFollowersDataType = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
