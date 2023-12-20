import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

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

export async function middleware(request: NextRequest, event: NextFetchEvent) {
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


  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
    }
  };

  let url = `${process.env.NEXT_PUBLIC_BASE_URL}auth/me` as string;

  const authPaths = ['/sign-in', '/sign-up', '/auth/registration-confirmation', '/email-verification', '/email-expired', '/forgot-password', '/verification-invalid'];

  const isAuthPath = authPaths.some((path) => pathname === path);
  

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      console.log(response.status, 'isAuth');

      return isAuthPath
        ? NextResponse.redirect(new URL('/my-profile', request.url))
        : NextResponse.next()
    } else {
      console.log("Middleware (Not Authorized)")

      return !isAuthPath
        ? NextResponse.redirect(new URL('/sign-in', request.url))
        : NextResponse.next()
    }
  } catch (error) {
    console.log("NOT Authorized because of error : ", error);
  }

}
