import axios, { AxiosInstance } from 'axios';
import { parse } from 'cookie';
import { NextApiRequest } from 'next';
import { baseUrl } from '@/config';
import { accessToken } from '@/accessToken';

//to get client-side requests
export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

//to get data inside getServerSideProps
export const createAxiosServerInstance = (
  req: NextApiRequest
): AxiosInstance => {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken || '';

  const serverInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return serverInstance;
};
