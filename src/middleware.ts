
import { NextRequest, NextResponse } from 'next/server';
import { routes } from './api/routes';
import { getRefreshToken } from './utils/getRefreshToken';
import { requestMeOptions, requestUpdateTokensOptions } from './app/actionOptions';
import { setCookieExpires } from './utils/setCookieExpire';

export function getUserPreferredLanguage(acceptLanguage: string | null) {
  try {
    const preferredLanguage = acceptLanguage?.split(',')[0];
    if (preferredLanguage?.startsWith('ru')) {
      return 'ru';
    }
  } catch { }
  return 'en';
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};



export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname } = request.nextUrl;
  const headersList = request.headers;
  const cookiesList = request.cookies;
  const userAgent = headersList.get('user-agent') || '';
  const defaultLang = getUserPreferredLanguage(
    headersList.get('accept-language')
  );
  const changedLang = cookiesList.get('userLanguage')?.value;
  const lang = changedLang || defaultLang;
  const isMobile = /mobile/i.test(userAgent);

  const accessToken = cookiesList.get('accessToken')?.value
  const refreshToken = cookiesList.get('refreshToken')?.value


  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);

  const authPaths = ['/sign-in', '/sign-up', '/auth/registration-confirmation', '/email-verification', '/email-expired', '/forgot-password', '/verification-invalid'];

  const isAuthPath = authPaths.some((path) => pathname === path);

  //definitely not auth user
  if (!refreshToken) {

    console.log('Middleware (User in NOT auth)');

    return isAuthPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/sign-in', request.url))
  }

  //checking auth
  try {
    const meResponse = await fetch(routes.ME, requestMeOptions(accessToken));

    switch (meResponse.status) {
      case 200:
        console.log(meResponse.status, 'isAuth');

        return isAuthPath
          ? NextResponse.redirect(new URL('/my-profile', request.url))
          : NextResponse.next()
      case 401:
        console.log("Middleware (Bad AccessToken)");

        try {
          const updateTokenResponse = await fetch(routes.UPDATE_TOKENS, requestUpdateTokensOptions(refreshToken));
          const res = await updateTokenResponse.json();
          const newAccessToken = res.accessToken;
          const newRefreshToken = getRefreshToken(updateTokenResponse.headers.getSetCookie());

          if (updateTokenResponse.status === 200) {
            console.log("MiddleWare (Update Tokens Success)");

            return NextResponse.next({
              headers: {
                'Set-Cookie': [
                  `accessToken=${newAccessToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`,
                  `refreshToken=${newRefreshToken}; Path=/; Secure; SameSite=None; Expires=${setCookieExpires()}`
                ]
              } as any,  //any is needed for real, looks like Next bug, when setting multiple cookies 
            })
          }
        } catch (error) {
          console.error("error with updating Tokens", error);
          return
        }
        break;

      default:
        console.log("Middleware (Not Authorized)")

        return !isAuthPath
          ? NextResponse.redirect(new URL('/sign-in', request.url))
          : NextResponse.next()
    }

  } catch (error) {
    console.log("NOT Authorized because of error : ", error);
  }

}
