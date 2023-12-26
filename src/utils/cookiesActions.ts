// all cookie expires after 14days

import Cookies from 'js-cookie';

const days = 24 * 60 * 60 * 1000;

export const setCookieExpires = () => {
  return new Date(Date.now() + 14 * days).toUTCString();
};

export const setAuthCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: 14,
    sameSite: 'none',
    secure: true,
  });
};
