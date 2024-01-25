'use server';

import { NextResponse } from 'next/server';
import { citySelectRoutes, routes } from '@/api/routes';
import { SignInData } from '@/features/schemas/SignInSchema';
import {
  checkRecoveryCodeOptions,
  deleteAvatarOptions,
  loginOptions,
  newPasswordOptions,
  recoveryPasswordOptions,
  requestDeleteAllSessionsOptions,
  requestGoogleLoginOptions,
  requestLogoutOptions,
  requestUpdateTokensOptions,
  updateProfileOptions,
  uploadAvatarOptions,
} from './actionOptions';
import { getRefreshToken } from '@/utils/getRefreshToken';
import { setCookieExpires } from '@/utils/cookiesActions';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { ProfileFormSubmit } from '@/components/ProfileSettings/SettingsForm/SettingsForm';

// AUTH ACTIONS

export async function signInAction(data: SignInData) {
  if (data) {
    try {
      const res = await fetch(routes.LOGIN, loginOptions(data));
      const responseBody = await res.json();
      if (res.ok) {
        const refreshToken = {
          refreshToken: getRefreshToken(res.headers.get('set-cookie')),
        };

        const returnData = { ...responseBody, ...refreshToken };

        return { success: true, data: returnData };
      } else {
        return { success: false, error: responseBody };
      }
    } catch (error) {
      console.error(error, 'post error');
    }
  }
}

export async function signUpAction(data: SignInData) {
  try {
    const newData = { ...data, email: data.email.toLowerCase() };
    const res = await fetch(routes.SIGN_UP, loginOptions(newData));
    console.log("res", res);
    console.log("res", res.headers);
    
    const responseBody = await res.json();
    console.log('responseBody', responseBody);
    if (res.ok) {
      
      const returnData = { ...responseBody };

      return { success: true, data: returnData };
    } else {
      return { success: false, error: responseBody };
    }
  } catch (error) {
    console.error(error, 'post error');
  }
}

export async function forgotPasswordAction(data: {
  email: string;
  recaptcha: string;
}) {
  if (data) {
    try {
      const res = await fetch(
        routes.PASSWORD_RECOVERY,
        recoveryPasswordOptions(data)
      );

      if (res.ok) {
        return { success: true, data: 'The link has been sent by email' };
      } else {
        return { success: false, error: 'errorCode' };
      }
    } catch (error) {
      return { success: false, error: 'errorCode' };
    }
  }
}

export async function checkRecoveryCodeAction(code: string | undefined) {
  if (code) {
    try {
      const res = await fetch(
        routes.CHECK_RECOVERY_CODE,
        checkRecoveryCodeOptions(code)
      );
      const responseBody = await res.json();

      if (res.ok) {
        return { success: true, data: responseBody };
      } else {
        console.error(
          'The recovery code is incorrect, expired or already been applied'
        );
        return { success: false };
      }
    } catch (error) {
      console.error(error, 'checkRecoveryCodeAction fetch error');
      return { success: false };
    }
  } else {
    console.error('There is no code to recover the password');

    return { success: false };
  }
}

export async function newPasswordAction(
  password: string,
  newPasswordCode: string | undefined
) {
  if (newPasswordCode) {
    try {
      const res = await fetch(
        routes.NEW_PASSWORD,
        newPasswordOptions(password, newPasswordCode)
      );

      if (res.ok) {
        return { success: true };
      } else {
        console.error('Incorrect input data by field');
        return { success: false };
      }
    } catch (error) {
      console.error(error, 'newPasswordAction fetch error');
      return { success: false };
    }
  } else {
    console.error('There is no code to recover the password');

    return { success: false };
  }
}

export async function logOutAction(refreshToken: string | undefined) {
  if (refreshToken) {
    try {
      const res = await fetch(
        routes.LOGOUT,
        requestLogoutOptions(refreshToken)
      );
      if (res.ok) {
        revalidatePath('/sign-in');

        return { success: true, data: 'logoutSuccess' };
      } else {
        return { success: false, error: 'logoutFailed' };
      }
    } catch (error) {
      console.error('Logout Error', error);
    }
  } else return { success: false, error: 'logoutFailed' };
}

export async function loginGoogleAction(code: string) {
  return fetch(routes.GOOGLE_LOGIN, requestGoogleLoginOptions(code))
    .then(async (res) => {
      if (res.ok) {
        const responseBody: { accessToken: string; email: string } =
          await res.json();

        const returnData = {
          email: responseBody.email,
          accessToken: responseBody.accessToken,
          refreshToken: getRefreshToken(res.headers.get('set-cookie')),
        };

        return { success: true, data: returnData };
      } else throw new Error(`Error With loginGoogleAction ${res.status}`);
    })
    .catch((error) => {
      console.log(error);

      return { success: false, data: error };
    });
}

//SESSION ACTIONS

export async function deleteAllSessionsAction(
  accessToken: string | undefined,
  refreshToken: string | undefined
) {
  try {
    fetch(
      routes.TERMINATE_ALL_SESSIONS,
      requestDeleteAllSessionsOptions(accessToken, refreshToken)
    ).then((res) => ({ success: true, data: 'deleteAllSessionsSuccess' }));
  } catch (error) {
    return { success: false, error: 'deleteAllSessionsFailed' };
  }
}

// middleware actions

export async function updateTokenMiddleware(
  currentRefreshToken: string | undefined
) {
  try {
    if (currentRefreshToken) {
      const res = await fetch(
        routes.UPDATE_TOKENS,
        requestUpdateTokensOptions(currentRefreshToken)
      );
      const responseBody = await res.json();
      if (res.ok) {
        const newAccessToken = responseBody.accessToken;
        const newRefreshToken = getRefreshToken(res.headers.get('set-cookie'));

        return NextResponse.next({
          headers: {
            'Set-Cookie': [
              `accessToken=${newAccessToken}; Path=/; Secure; SameSite=None`,
              `refreshToken=${newRefreshToken}; Path=/; Secure; SameSite=None`,
            ],
          } as any, //any is needed for real, looks like Next bug, when setting multiple cookies
        });
      } else {
        console.log('UpdateToken failed');

        return { success: false, error: responseBody };
      }
    } else throw new Error('Refresh Token not found');
  } catch (error) {
    console.error('error with updating Tokens', error);
  }
}

export async function updateTokensAndContinue(refreshToken: string) {
  try {
    const updateTokenResponse = await fetch(
      routes.UPDATE_TOKENS,
      requestUpdateTokensOptions(refreshToken)
    );
    const res = await updateTokenResponse.json();
    const newAccessToken = res.accessToken;
    const newRefreshToken = getRefreshToken(
      updateTokenResponse.headers.get('set-cookie')
    );

    if (updateTokenResponse.status === 200) {
      console.log('MiddleWare (Update Tokens Success)');

      const action = NextResponse.next({
        headers: {
          'Set-Cookie': [
            `accessToken=${newAccessToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`,
            `refreshToken=${newRefreshToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`,
          ],
        } as any,
      });

      return { success: true, action };
    } else {
      throw new Error('error with updating Tokens');
    }
  } catch (error) {
    console.error(error);

    const action = NextResponse.next({
      headers: {
        'Set-Cookie': [
          'accessToken=; Path=/; Secure; SameSite=None; Max-Age=0',
          'refreshToken=; Path=/; Secure; SameSite=None; Max-Age=0',
        ],
      } as any,
    });

    return { success: false, action };
  }
}

//PROFILE

export async function uploadAvatarAction(avatar: FormData) {
  const accessToken = headers().get('accessToken');

  return fetch(
    routes.UPLOAD_PROFILE_AVATAR,
    uploadAvatarOptions(accessToken, avatar)
  )
    .then((res) => {
      if (res.ok) {
        revalidatePath('/my-profile/settings-profile/general-information');

        return { success: true, modalText: 'avatarSuccessfullyUploaded' };
      }

      return Promise.reject(
        new Error(`Error uploadAvatarAction, status ${res.status}`)
      );
    })
    .catch((error) => {
      console.error(error);
      return { success: false, modalText: 'avatarUploadFailed' };
    });
}
export async function deleteAvatarAction() {
  const accessToken = headers().get('accessToken');

  return fetch(routes.UPLOAD_PROFILE_AVATAR, deleteAvatarOptions(accessToken))
    .then((res) => {
      if (res.ok) {
        revalidatePath('/my-profile/settings-profile/general-information');

        return { success: true, modalText: 'avatarSuccessfullyDeleted' };
      }

      return Promise.reject(
        new Error(`Error deleteAvatarAction, status ${res.status}`)
      );
    })
    .catch((error) => {
      console.error(error);
      return { success: false, modalText: 'avatarDeleteFailed' };
    });
}

export async function fetchCountriesList() {
  return fetch(citySelectRoutes.FIND_COUNTRY, { cache: 'force-cache' })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(
            new Error(`Error deleteAvatarAction, status ${res.status}`)
          )
    )
    .catch((error) => {
      console.error(error);
      return { success: false, modalText: 'avatarDeleteFailed' };
    });
}

export async function updateProfileInfoAction(data: ProfileFormSubmit) {
  const accessToken = headers().get('accessToken');

  return fetch(
    routes.USERS_PROFILE,
    updateProfileOptions(accessToken, data)
  ).then(async (res) => {
    if (res.ok) {
      revalidatePath('/my-profile/settings-profile/general-information');
      return { success: true, modalText: 'updateProfileSuccess' };
    }

    const errorData = await res.json();
    const messageField = errorData.messages.field;

    console.error(`Error updateProfileInfoAction`);
    console.error(errorData);

    let toastMessage;
    switch (messageField) {
      case 'userName':
        toastMessage = 'updateProfileUserExist';
        break;

      default:
        toastMessage = 'updateProfileFailed';
        break;
    }

    return { success: false, modalText: toastMessage };
  });
}
