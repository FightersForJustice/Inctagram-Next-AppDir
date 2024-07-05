import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPublicPosts = async (userId: number, endCursorPostId: number | null) => {
  const apiUrl =
    baseUrl + `/api/v1/public-posts/user/${userId}/${endCursorPostId}`;
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 0 } });
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

export const getPublicProfile = async (profileId: number) => {

  const apiUrl = baseUrl + `public-user/profile/${profileId}`;
  try {
    const response = await fetch(apiUrl)
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

export const getPublicPostsPage = async () => {
  const apiUrl =
    baseUrl + `public-posts/all/,?sortDirection=desc`;
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 0 } });
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