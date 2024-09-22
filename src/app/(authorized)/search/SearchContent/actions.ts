import { cookies } from 'next/headers';
import { getUsersOptions } from '@/app/lib/actionOptions';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async (
  search: string,
  pageSize: number = 12,
  pageNumber: number = 1,
  cursor: number = 0
) => {
  const accessToken = cookies().get('accessToken')?.value;
  const apiUrl =
    baseUrl +
    `users?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getUserInfo = async (userName: string) => {
  const accessToken = cookies().get('accessToken')?.value;
  const apiUrl = baseUrl + `users/${userName}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data = await response.json();
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
  const accessToken = cookies().get('accessToken')?.value;
  const apiUrl =
    baseUrl +
    `users/${userName}/followers?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data = await response.json();
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
  const accessToken = cookies().get('accessToken')?.value;
  const apiUrl =
    baseUrl +
    `users/${userName}/following?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}&cursor=${cursor}`;
  try {
    const response = await fetch(apiUrl, getUsersOptions(accessToken));
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
