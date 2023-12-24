'use server';

import { routes } from '@/api/routes';
import { SingInData } from '@/features/schemas/SignInSchema';
import {
  loginOptions,
  requestGoogleLoginOptions,
  requestLogoutOptions,
  requestUpdateTokensOptions,
} from './actionOptions';
import { getRefreshToken } from '@/utils/getRefreshToken';
import { NextResponse } from 'next/server';
import { setCookieExpires } from '@/utils/setCookieExpire';

// AUTH ACTIONS

export async function signInAction(data: SingInData) {
  if (data) {
    console.log('SignInSchema validated success');
    try {
      const res = await fetch(routes.LOGIN, loginOptions(data));
      const responseBody = await res.json();
      if (res.ok) {
        const refreshToken = {
          refreshToken: getRefreshToken(res.headers.getSetCookie()),
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

export async function logOutAction(refreshToken: string | undefined) {
  if (refreshToken) {
    try {
      const res = await fetch(
        routes.LOGOUT,
        requestLogoutOptions(refreshToken)
      );
      if (res.ok) {
        return { success: true, data: 'logout.success' };
      } else {
        return { success: false, data: 'logout.failed' };
      }
    } catch (error) {
      console.error('Logout Error', error);
    }
  } else return { success: false, error: 'logout.failed' };
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
        refreshToken: getRefreshToken(res.headers.getSetCookie()),
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
        const newRefreshToken = getRefreshToken(res.headers.getSetCookie());

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
      updateTokenResponse.headers.getSetCookie()
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
