import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getServerAuth } from './utils/auth/getServerAuth';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export async function middleware(request: NextRequest) {
  console.log(request.cookies.get('accessToken')?.value);
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
    },
  };

  let url = 'https://inctagram.work/api/v1/auth/me';
  let response = await fetch(url, requestOptions);
  console.log('response status ' + response.status);
  let commits = await response.json();
  console.log(commits);

  // return NextResponse.rewrite(new URL('/ru/sign-up', request.url));
}
