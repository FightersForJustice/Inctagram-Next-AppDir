import { NextResponse } from 'next/server';

import axios from 'axios';
interface LoginData {
  email: string;
  password: string;
}
interface AuthResponse {
  refreshToken?: string;
  accessToken?: string;
  statusCode: number;
  error?: string;
  messages?: [];
}

async function getLogin(res: LoginData): Promise<AuthResponse | undefined> {
  const apiUrl = 'https://inctagram.work/api/v1/auth/login';

  try {
    const resp = await axios.post(apiUrl, res);

    if (resp.headers['set-cookie']) {
      const cookiesString = resp.headers['set-cookie'][0];
      const refreshTokenStart =
        cookiesString.indexOf('refreshToken=') + 'refreshToken='.length;
      const refreshTokenEnd = cookiesString.indexOf(';', refreshTokenStart);
      const refreshToken = cookiesString.slice(
        refreshTokenStart,
        refreshTokenEnd
      );

      return {
        statusCode: resp.status,
        refreshToken: refreshToken,
        accessToken: resp.data.accessToken,
      };
    }
  } catch (error: any) {
    return {
      statusCode: error.response.status,
      error: error.response.data.error,
      messages: error.response.data.messages,
    };
  }

  return undefined;
}

async function exampleUsage(res: LoginData) {
  try {
    const refreshToken = await getLogin(res);

    if (refreshToken) {
      return refreshToken;
    } else {
      console.log('Failed to retrieve Refresh Token.');
    }
  } catch (error: any) {
    console.error('Error2', error.message);
  }
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  try {
    const result = await exampleUsage(res);
    return NextResponse.json(result, { status: result?.statusCode });
  } catch (error) {
    return NextResponse.json({ error: 'Error3' }, { status: 500 });
  }
}
