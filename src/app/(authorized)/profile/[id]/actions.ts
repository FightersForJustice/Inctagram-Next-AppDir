'use server';
import { accessToken } from '@/utils/serverActions';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProfile = async (id: number) => {
  const accessToken = cookies().get('accessToken');

  const apiUrl = baseUrl + `public-user/profile/${id}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
export const getPublicProfile = async (id: number) => {

  const apiUrl = baseUrl + `public-user/profile/${id}`;
  try {
    const response = await fetch(apiUrl, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    });
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

export const getPosts = async (id: number, minId: number | null) => {
  const apiUrl =
    baseUrl + `public-posts/user/${id}/${minId}?pageSize=8&sortDirection=desc`;
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 10 } });
//  const a = response.json()
//     console.log(a)
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

export const getPostsDelete = async (postId: number) => {
  const apiUrl = baseUrl + `posts/${postId}`;
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  });
  return response.status;
};

export const updatePost = async (postId: number, postData: string) => {
  const apiUrl = baseUrl + `posts/${postId}`;
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken()}`,
    },
    body: JSON.stringify({ description: postData }),
  });
  return response.status;
};