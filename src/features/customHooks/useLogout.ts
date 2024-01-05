import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { logOutAction } from '@/app/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { AppDispatch, useAppDispatch } from '@/redux/hooks/useDispatch';
import { authActions } from '@/redux/reducers/authSlice';

export const logout = async (
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>,
  t: any,
  router: AppRouterInstance,
  dispatch: AppDispatch
) => {

  setShowLogoutModal(false);
  const refreshToken = Cookies.get('refreshToken');
  const res = await logOutAction(refreshToken);
  Cookies.remove('refreshToken');
  Cookies.remove('accessToken');
  dispatch(authActions.postLogin());

  toast.success(t(res?.data));
  router.push('/sign-in');
};
