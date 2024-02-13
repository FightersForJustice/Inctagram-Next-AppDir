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
import { cookieDays, setCookieExpires } from '@/utils/cookiesActions';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { ProfileFormSubmit } from '@/components/ProfileSettings/SettingsForm/SettingsForm';

// AUTH ACTIONS

export async function signInAction(data: SignInData) {
  if (data) {
    try {
      const res = await fetch(routes.LOGIN, loginOptions(data));
      const responseBody = await res.json();

      if (!res.ok) {
        return { success: false, error: responseBody };
      }
      const accessToken = responseBody.accessToken;
      const refreshToken = getRefreshToken(res.headers.get('set-cookie'));

      cookies().set({
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
        path: '/',
        secure: true,
        expires: Date.now() + cookieDays * 30,
      });
      cookies().set({
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        path: '/',
        secure: true,
      });

      return { success: true, data: responseBody };
    } catch (error) {
      console.error(error, 'post error');
    }
  }
}

export async function signUpAction(data: SignInData) {
  try {
    const newData = {
      ...data,
      email: data.email.toLowerCase(),
      baseUrl: process.env.NEXT_PUBLIC_APP_URL,
    };
    const res = await fetch(routes.SIGN_UP, loginOptions(newData));
    if (res.ok) {
      return { success: true, data: 'signUpSuccess' };
    }

    const responseBody = await res.json();
    const field = responseBody.messages[0]?.field;

    if (field === 'email') {
      // Мы не бросаем ошибку из-за безопасности (XSS)
      return { success: true, data: 'signUpSuccess' };
    }

    const error =
      field === 'userName' ? 'userName.nameExist' : 'unexpectedError';
    return { success: false, data: error };
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

export async function logOutAction() {
  const refreshToken = cookies().get('refreshToken')?.value;
  if (refreshToken) {
    try {
      const res = await fetch(
        routes.LOGOUT,
        requestLogoutOptions(refreshToken)
      );
      if (!res.ok) {
        throw new Error('logoutFailed');
      }
      cookies().delete('refreshToken');
      cookies().delete('accessToken');
      revalidatePath('/sign-in');

      return { success: true, data: 'logoutSuccess' };
    } catch (error) {
      console.error('Logout Error', error);
      return { success: false, error: error };
    }
  } else return { success: false, error: 'logoutFailed(noRefreshToken)' };
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

export async function deleteAllSessionsAction() {
  const accessToken = headers().get('accessToken');
  const refreshToken = headers().get('refreshToken');

  try {
    if (accessToken && refreshToken) {
      const res = await fetch(
        routes.TERMINATE_ALL_SESSIONS,
        requestDeleteAllSessionsOptions(accessToken, refreshToken)
      );

      if (!res.ok) {
        throw new Error('deleteAllSessionsFailed');
      }
      return { success: true, data: 'deleteAllSessionsSuccess' };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}

// middleware actions

export async function updateTokensAndContinue(refreshToken: string) {
  try {
    const updateTokenResponse = await fetch(
      routes.UPDATE_TOKENS,
      requestUpdateTokensOptions(refreshToken)
    );
    if (!updateTokenResponse.ok) {
      console.log('UpdateToken failed', updateTokenResponse);
      throw new Error('error with updating Tokens');
    }
    console.log('MiddleWare (Update Tokens Success)');

    const res = await updateTokenResponse.json();
    const newAccessToken = res.accessToken;
    const newRefreshToken = getRefreshToken(
      updateTokenResponse.headers.get('set-cookie')
    );

    const action = NextResponse.next({
      headers: {
        'Set-Cookie': [
          `accessToken=${newAccessToken}; Path=/; Secure; HttpOnly; SameSite=None; Expires=${setCookieExpires()}`,
          `refreshToken=${newRefreshToken}; Path=/; Secure; HttpOnly; SameSite=None; Expires=${setCookieExpires()}`,
        ],
      } as any,
    });

    return { success: true, action };
  } catch (error) {
    console.error('updateTokensAndContinue ERROR', error);

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
        revalidatePath('/profile/settings-profile/general-information');

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
        revalidatePath('/profile/settings-profile/general-information');

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
      revalidatePath('/profile/settings-profile/general-information');
      return { success: true, modalText: 'updateProfileSuccess' };
    }

    const errorData = await res.json();
    const messageField = errorData.messages[0].field;

    console.error(`Error updateProfileInfoAction`);
    console.error(errorData);

    let toastMessage;
    switch (messageField) {
      case 'userName':
        toastMessage = 'updateProfileUserExist';
        break;

      default:
        toastMessage = 'updateProfileError';
        break;
    }

    return { success: false, modalText: toastMessage };
  });
}
// CreatePost
export async function UploadPostImage(formData: FormData, accessToken: string) {
  return fetch(routes.UPLOAD_POST_IMAGE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  }).then((res) => {
    if (res.ok) {
      return { success: true, data: res };
    } else {
      return { success: false, status: res.status, data: res };
    }
  });
}
