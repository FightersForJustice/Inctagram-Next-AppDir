'use server';
import { getSubsriptionOptions } from '@/app/lib/actionOptions';
import { accessToken } from '@/utils/serverActions';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPayments = async () => {
  const accessToken = cookies().get('accessToken');

  const apiUrl = baseUrl + `subscriptions/my-payments`;
  try {
    console.log(apiUrl, 11);
    const response = await fetch(
      apiUrl,
      getSubsriptionOptions(accessToken?.value));
    if (!response.ok) {
      console.log(response);
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

export const getSubscriptions = async () => {
  const accessToken = cookies().get('accessToken');

  const apiUrl = baseUrl + `subscriptions/current-payment-subscriptions`;
  try {
    console.log(apiUrl, 11);
    const response = await fetch(
      apiUrl,
      getSubsriptionOptions(accessToken?.value));
    if (!response.ok) {
      console.log(response);
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


export const cancelAutoRenewal = async () => {
  const accessToken = cookies().get('accessToken');

  console.log(accessToken);

  const apiUrl = baseUrl + `subscriptions/canceled-auto-renewal`;

  console.log(apiUrl);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    if (!response.ok) {
      console.error('response:', response);
      console.error('Error!!!!:', response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


export const getSubscriptionsCosts = async () => {
  const accessToken = cookies().get('accessToken');

  const apiUrl = baseUrl + `subscriptions/cost-of-payment-subscriptions`;
  try {
    console.log(apiUrl, 11);
    const response = await fetch(
      apiUrl,
      getSubsriptionOptions(accessToken?.value));
    if (!response.ok) {
      console.log(response);
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

export const getFollowersPosts = async (endCursorPostId: number) => {
  const apiUrl =
    baseUrl + `home/publications-followers?pageSize=12&endCursorPostId=${endCursorPostId}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken()}`,
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

export const getLikesPostId = async (postId: number) => {
  const apiUrl = baseUrl + `posts/${postId}/likes`;
  const accessToken = cookies().get('accessToken');
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    if (!response.ok) {
      console.error('Errorrrrr:', response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const updateLikesPostId = async (postId: number, likeStatus: boolean) => {
  const apiUrl = baseUrl + `posts/${postId}/like-status`;
  const accessToken = cookies().get('accessToken');
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify({ likeStatus: likeStatus ? 'DISLIKE' : 'LIKE' }),
  });
  console.log(response.status)
  return response.status;
};