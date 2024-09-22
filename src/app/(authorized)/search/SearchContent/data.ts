import {
  createFollowingOption,
  deleteFollowerOption,
} from '@/app/lib/actionOptions';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
