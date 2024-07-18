import { NextRequest, NextResponse } from 'next/server';

import { routes } from './api/routes';
import { requestMeOptions } from './app/lib/actionOptions';
import { updateTokensAndContinue } from './app/lib/actions';
import { ADMIN_ROUTES_ARRAY, AUTH_ROUTES, AUTH_ROUTES_ARRAY, ROUTES } from './appRoutes/routes';

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
  const { pathname, searchParams } = request.nextUrl;
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
  const corn = cookiesList.get('corn')?.value;

  const isValidAuthPath = (pathname: string) => {
    return AUTH_ROUTES_ARRAY.some((route) => pathname.includes(route));
  };

  const isNotAdminPath = (pathname: string) => {
    return ADMIN_ROUTES_ARRAY.some((route) => pathname.includes(route));
  };
  const isAdminPath = isNotAdminPath(pathname)

  const isAuthPath = pathname && isValidAuthPath(pathname);
  if (!corn && isAdminPath) {
    return NextResponse.redirect(
      new URL(AUTH_ROUTES.PUBLIC_POST_PAGE, request.url)
    );
  }
  if (corn && isAdminPath) {
    return NextResponse.next()
  }
  if (!refreshToken) {
    console.log('3Middleware (User in NOT auth)', isAuthPath);
    

    return isAuthPath && !isAdminPath
      ? NextResponse.next()
      : NextResponse.redirect(
          new URL(AUTH_ROUTES.PUBLIC_POST_PAGE, request.url)
        );
  }

  //checking auth refactor
  try {
    let meResponse = await fetch(routes.ME, requestMeOptions(accessToken));

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
        console.log('2Middleware (Bad AccessToken)');
        const updateTokenResult = await updateTokensAndContinue(
          refreshToken,
          userAgent
        );
        if (updateTokenResult.success) {
          return updateTokenResult.action;
        } else {
          NextResponse.redirect(new URL('/error', request.url));
        }
      case 400:
        console.log('7Middleware (Not Authorized)', isAuthPath);
          return NextResponse.redirect(new URL(AUTH_ROUTES.PUBLIC_POST_PAGE, request.url));
      default:
        console.log('1Middleware (Not Authorized)', isAuthPath);
        return !isAuthPath
          ? NextResponse.redirect(
              new URL(AUTH_ROUTES.PUBLIC_POST_PAGE, request.url)
            )
          : NextResponse.next();
    }
  } catch (error) {
    console.log('NOT Authorized because of error : ', error);
  }
}
