// all cookie expires after 14days

import Cookies from "js-cookie";

export const setCookieExpires = () => {
  return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toUTCString();
};

export const setAuthCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: 14,
    sameSite: 'none',
    secure: true,
  });
}