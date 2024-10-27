import { getUsersOptions } from '@/app/lib/actionOptions';
import { accessToken } from '@/utils/serverActions';
import { UserFollowingDataType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';

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
