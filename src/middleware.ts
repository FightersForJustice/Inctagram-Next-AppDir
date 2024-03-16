import { NextRequest, NextResponse } from 'next/server';

import { routes } from './api/routes';
import { requestMeOptions } from './app/lib/actionOptions';
import { updateTokensAndContinue } from './app/lib/actions';
import { AUTH_ROUTES, AUTH_ROUTES_ARRAY, ROUTES } from './appRoutes/routes';

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
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headersList = request.headers;
  console.log('>>> request >>>', request);
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

  const isAuthPath = AUTH_ROUTES_ARRAY.some((path) => pathname === path);

  //definitely not auth user
  if (!refreshToken) {
    console.log('Middleware (User in NOT auth)');

    return isAuthPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN, request.url));
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
        //all we need in client components
        response.headers.set('id', `${responseData.userId}`);
        response.headers.set('userEmail', `${responseData.email}`);
        response.headers.set('userName', `${responseData.email}`);
        //response.cookies.set('userLanguage', lang);
        return isAuthPath
          ? NextResponse.redirect(
              new URL(`${ROUTES.PROFILE}/${responseData.userId}`, request.url)
            )
          : response;
      case 401:
        console.log('Middleware (Bad AccessToken)');
        const updateTokenResult = await updateTokensAndContinue(refreshToken);

        return updateTokenResult.action;
      default:
        console.log('Middleware (Not Authorized)');
        return !isAuthPath
          ? NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN, request.url))
          : NextResponse.next();
    }
  } catch (error) {
    console.log('NOT Authorized because of error : ', error);
  }
}
