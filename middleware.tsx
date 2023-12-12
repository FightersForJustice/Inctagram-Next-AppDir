import createMiddleware from 'next-intl/middleware';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export async function middleware(request: NextRequest) {
  console.log(request);
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

  return NextResponse.redirect(new URL('/login', request.url));
}
