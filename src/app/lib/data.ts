import { routes } from '@/api/routes';
import { getMyProfileOptions } from './dataOptions';

export async function fetchGetMyProfile(accessToken: string | null) {
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
