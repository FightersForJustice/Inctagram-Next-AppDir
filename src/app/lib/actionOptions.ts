import { ProfileFormSubmit } from '@/components/ProfileSettings/SettingsForm/SettingsForm';
import { SignInData } from '@/features/schemas/SignInSchema';
import { createPostOptionsType } from './optionsTypes';

//AUTH OPTIONS

export const loginOptions = (
  data: SignInData,
  userAgent: string & {
    baseUrl?: string | undefined;
  }
) => {
  console.log('data', data);

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': userAgent,
    },
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  };
};

export const recoveryPasswordOptions = (data: {
  email: string;
  recaptcha: string;
}) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, baseUrl: process.env.NEXT_PUBLIC_APP_URL }),
    next: { revalidate: 0 },
  };
};

export const checkRecoveryCodeOptions = (code: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recoveryCode: code }),
    next: { revalidate: 0 },
  };
};

export const newPasswordOptions = (password: string, code: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newPassword: password,
      recoveryCode: code,
    }),
    next: { revalidate: 0 },
  };
};

export const requestUpdateTokensOptions = (
  refreshToken: string | undefined,
  userAgent: string
) => {
  return {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
      'user-agent': userAgent,
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

//SESSION OPTIONS

export const requestDeleteAllSessionsOptions = (
  accessToken: string | undefined,
  refreshToken: string | undefined
) => {
  return {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `refreshToken=${refreshToken}`,
    },
    next: { revalidate: 0 },
  };
};

//PROFILE OPTIONS

export const uploadAvatarOptions = (
  accessToken: string | null,
  avatar: FormData
) => {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0 },
    body: avatar,
  };
};

export const updateProfileOptions = (
  accessToken: string | null,
  data: ProfileFormSubmit
) => {
  return {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  };
};

export const deleteAvatarOptions = (accessToken: string | null) => {
  return {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0 },
  };
};

//POST OPTIONS

export const createPostOptions = (
  accessToken: string | null,
  body: createPostOptionsType
) => {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

export const uploadPostOptions = (
  accessToken: string | null,
  formData: FormData
) => {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  };
};

export const deleteUploadedPostOptions = (accessToken: string | null) => {
  return {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
