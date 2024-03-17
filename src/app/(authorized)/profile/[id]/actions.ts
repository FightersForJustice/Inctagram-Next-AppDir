'use server';

import { cookies } from 'next/headers';
import {revalidatePath, revalidateTag} from 'next/cache';
import { ROUTES } from '@/appRoutes/routes';
import {routes} from "@/api/routes";
import {accessToken} from "@/utils/serverActions";

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


export const updatePost = async (postId: number, data: FormData ) => {
  const apiUrl = routes.UPDATE_POST + `/${postId}`;

  console.log('ALOOOOOOOOOOOOOOO GDE VISOV')
  console.log('DATAAAAAAAAAAA', JSON.stringify(data))
  console.log('DATAAAAAAAAAAA', data)
  return fetch(
     apiUrl,
     {
       credentials: 'include',
       headers: {
         Authorization: `Bearer ${accessToken()}`,
         'Content-Type': 'application/json',
       },
       method: 'PUT',
       body: JSON.stringify(
          {
            description: data.get('description')
          }
       )
     }
  )
     .then(res => {

       console.log('>>> res >>>', res)
       if (res.ok) {
         revalidatePath('/profile/[id]/page')
          revalidateTag('')
         console.log('OKKKKKKKKKKKKKKK')
       }
     })
     .catch(error => {
       console.log('>>> error >>>', error)
     })
};
