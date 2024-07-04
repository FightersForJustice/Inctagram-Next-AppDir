import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { logOutAction } from '@/app/lib/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { AUTH_ROUTES } from '@/appRoutes/routes';

export const logout = async (
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>,
  t: any,
  router: AppRouterInstance
) => {
  setShowLogoutModal(false);
  const res = await logOutAction();
  toast.success(t(res?.data));
  router.replace(AUTH_ROUTES.SIGN_IN);
};
