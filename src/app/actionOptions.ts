import { SingInData } from '@/features/schemas/SignInSchema';

export const loginOptions = (data: SingInData) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  };
};

export const requestUpdateTokensOptions = (
  refreshToken: string | undefined
) => {
  return {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    next: { revalidate: 0 },
  };
};

export const requestMeOptions = (accessToken: string | undefined) => {
  return {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0 },
  };
};

export const requestLogoutOptions = (refreshToken: string | undefined) => {
  return {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    next: { revalidate: 0 },
  };
};

export const requestGoogleLoginOptions = (googleCode: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: googleCode }),
    next: { revalidate: 0 },
  };
};
