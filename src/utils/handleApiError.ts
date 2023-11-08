import { toast } from 'react-toastify';

interface FetchBaseQueryError {
  status: string;
  error?: string;
  data?: any;
}

interface SerializedError {
  message: any;
}

export const handleApiError = (error: FetchBaseQueryError | any) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    toast.error(errMsg);
  } else {
    toast.error(error.message);
  }
};
