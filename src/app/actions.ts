'use server';

import { routes } from '@/api/routes';
import { SingInData } from '@/features/schemas/SignInSchema';
import {
  checkRecoveryCodeOptions,
  loginOptions,
  newPasswordOptions,
  recoveryPasswordOptions,
  requestGoogleLoginOptions,
  requestLogoutOptions,
  requestUpdateTokensOptions,
} from './actionOptions';
import { getRefreshToken } from '@/utils/getRefreshToken';
import { NextResponse } from 'next/server';
import { setCookieExpires } from '@/utils/cookiesActions';

// AUTH ACTIONS

export async function signInAction(data: SingInData) {
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
        return { success: true, data: 'logoutSuccess' };
      } else {
        return { success: false, data: 'logoutFailed' };
      }
    } catch (error) {
      console.error('Logout Error', error);
    }
  } else return { success: false, error: 'logoutFailed' };
}

export async function loginGoogleAction(code: string) {
  try {
    const res = await fetch(
      routes.GOOGLE_LOGIN,
      requestGoogleLoginOptions(code)
    );
    const responseBody = await res.json();
    if (res.ok) {
      console.log('GoogleAuth Success');

      const refreshToken = {
        refreshToken: getRefreshToken(res.headers.get('set-cookie')),
      };
      const returnData = { ...responseBody, ...refreshToken };

      return { success: true, data: returnData };
    } else {
      console.log('GoogleAuth Failed');

      return { success: false, error: responseBody };
    }
  } catch (error) {
    console.error('Logout Error', error);
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

export async function updateTokensAndContinue(
  refreshToken: string
): Promise<NextResponse> {
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
      return NextResponse.next({
        headers: {
          'Set-Cookie': [
            `accessToken=${newAccessToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`,
            `refreshToken=${newRefreshToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`,
          ],
        } as any,
      });
    }
  } catch (error) {
    console.error('error with updating Tokens', error);
  }

  return NextResponse.next();
}
