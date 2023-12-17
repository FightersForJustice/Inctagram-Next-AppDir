import { NextApiRequest } from 'next';
import axios, { AxiosInstance } from 'axios';
import { accessToken } from '@/accessToken';

export const createAxiosServerInstance = (
  req: NextApiRequest
): AxiosInstance => {
  const serverInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return serverInstance;
};

const meServer = async (req: NextApiRequest) => {
  const axiosInstance = createAxiosServerInstance(req);
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
const updateTokens = async (req: NextApiRequest) => {
  const axiosInstance = createAxiosServerInstance(req);
  const response = await axiosInstance.get('/auth/update-tokens');
  return response.data;
};

export const authAxiosApi = {
  meServer,
  updateTokens,
};
