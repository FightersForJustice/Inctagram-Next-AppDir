'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/appRoutes/routes';

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

export const getPosts = async (id: number, minId: number | null) => {
  const apiUrl =
    baseUrl + `public-posts/user/${id}/${minId}?pageSize=8&sortDirection=desc`;
  try {
    const response = await fetch(apiUrl);
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
  const accessToken = cookies().get('accessToken');
  const apiUrl = baseUrl + `posts/${postId}`;
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.status;
};

export const updatePost = async (formData: FormData, postId: number) => {
  const accessToken = cookies().get('accessToken');
  console.log('accessToken', accessToken);
  console.log('formData', formData.get('description'));
  const apiUrl = baseUrl + `posts/${postId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    revalidatePath(ROUTES.PROFILE);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
