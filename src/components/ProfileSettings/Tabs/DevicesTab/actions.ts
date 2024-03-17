'use server';
import {
  deleteOptions,
  deleteUploadedPostOptions,
  requestMeOptions,
} from '@/app/lib/actionOptions';
import { accessToken } from '@/utils/serverActions';

export async function userSessions() {
  try {
    const token = accessToken();
    if (token) {
      const res = await fetch(
        'https://inctagram.work/api/v1/sessions',
        requestMeOptions(token)
      );
      const responseBody = await res.json();
      return responseBody;
    }
  } catch (error) {
    console.error(error, 'post error');
  }
}

export async function deleteAllSessions(userAgent: string) {
  try {
    const token = accessToken();
    if (token) {
      const res = await fetch(
        'https://inctagram.work/api/v1/sessions/terminate-all',
        deleteOptions(token, userAgent)
      );
      const responseBody = await res.json();
      return responseBody;
    }
  } catch (error) {
    console.error(error, 'delete error');
  }
}
