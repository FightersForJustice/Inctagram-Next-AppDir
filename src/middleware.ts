import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

// export function getUserPreferredLanguage(acceptLanguage: string | null) {
//   try {
//     const preferredLanguage = acceptLanguage?.split(',')[0];
//     if (preferredLanguage?.startsWith('ru')) {
//       return 'ru';
//     }
//   } catch {}
//   return 'en';
// }

// type TRedirect = {
//   redirectPath: string;
//   query: string;
//   pathname: string;
//   request: NextRequest;
// };

// const customRedirect = ({
//   redirectPath,
//   pathname,
//   query,
//   request,
// }: TRedirect) => {
//   if (pathname !== redirectPath) {
//     return NextResponse.redirect(new URL(redirectPath + query, request.url));
//   }
// };

 export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headersList = request.headers;
  const cookiesList = request.cookies;
  const userAgent = headersList.get('user-agent') || '';
  // const defaultLang = getUserPreferredLanguage(
  //   headersList.get('accept-language')
  // );
  const changedLang = cookiesList.get('userLanguage')?.value;
  // const lang = changedLang || defaultLang;

  const isMobile = /mobile/i.test(userAgent);

  return NextResponse.next()

}


export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
