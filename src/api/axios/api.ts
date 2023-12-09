import { NextApiRequest } from 'next';
import { createAxiosServerInstance } from './instance';

const meServer = async (req: NextApiRequest) => {
  const axiosInstance = createAxiosServerInstance(req);
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const authAxiosApi = {
  meServer,
};
