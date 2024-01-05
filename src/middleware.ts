import { NextRequest, NextResponse } from 'next/server';

import { routes } from './api/routes';
import { requestMeOptions } from './app/actionOptions';
import { updateTokensAndContinue } from './app/actions';

export function getUserPreferredLanguage(acceptLanguage: string | null) {
  try {
    const preferredLanguage = acceptLanguage?.split(',')[0];
    if (preferredLanguage?.startsWith('ru')) {
      return 'ru';
    }
  } catch {}
  return 'en';
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

const authPaths = [
  '/sign-in',
  '/sign-up',
  '/auth/registration-confirmation',
  '/auth/recovery',
  '/email-verification',
  '/email-expired',
  '/forgot-password',
  '/verification-invalid',
  '/auth/recovery',
  '/auth/registration-confirmation',
  '/agreements/privacy-policy',
  '/agreements/terms-of-service',
];

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

  const accessToken = cookiesList.get('accessToken')?.value;
  const refreshToken = cookiesList.get('refreshToken')?.value;

  const isAuthPath = authPaths.some((path) => pathname === path);

  //definitely not auth user
  if (!refreshToken) {
    console.log('Middleware (User in NOT auth)');

    return isAuthPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/sign-in', request.url));
  }

  //checking auth refactor
  try {
    const meResponse = await fetch(routes.ME, requestMeOptions(accessToken));

    switch (meResponse.status) {
      case 200:
        console.log(meResponse.status, 'isAuth');
        const response = NextResponse.next();
        response.headers.set('accessToken', `${accessToken}`);
        const responseData = await meResponse.json();
        response.headers.set('id', `${responseData.userId}`);

        return isAuthPath
          ? NextResponse.redirect(new URL('/my-profile', request.url))
          : response;
      case 401:
        console.log('Middleware (Bad AccessToken)');
        const updateTokenResult = await updateTokensAndContinue(refreshToken);
        if (updateTokenResult.success) {
          return updateTokenResult.action;
        } else return updateTokenResult.action;

      default:
        console.log('Middleware (Not Authorized)');
        return !isAuthPath
          ? NextResponse.redirect(new URL('/sign-in', request.url))
          : NextResponse.next();
    }
  } catch (error) {
    console.log('NOT Authorized because of error : ', error);
  }
}
