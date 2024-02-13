import { routes } from '@/api/routes';
import { getMyProfileOptions } from './dataOptions';
import { headers } from 'next/headers';

export async function fetchGetMyProfile() {
  const accessToken = headers().get('accessToken');
  return fetch(routes.USERS_PROFILE, getMyProfileOptions(accessToken))
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(
            new Error(`error with fetchGetMyProfile ${res.status}`)
          )
    )
    .catch((error) => {
      console.log(error);
      return error;
    });
}
