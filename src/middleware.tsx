import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { getServerAuth } from './utils/auth/getServerAuth';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
