import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { logOutAction } from '@/app/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const useLogout = async (
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>,
  t: any,
  router: AppRouterInstance
) => {
  setShowLogoutModal(false);
  const refreshToken = Cookies.get('refreshToken');

  const res = await logOutAction(refreshToken);

  if (res?.success) {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');

    router.push('/sign-in');
    toast.success(t(res.data));
  } else toast.error(t(res?.error));
};
