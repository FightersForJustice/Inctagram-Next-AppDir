import { useEffect } from 'react';
import { useAppDispatch } from './useDispatch';
import { appSliceActions } from '../reducers/app/appSlice';

export function useAppLoad (isLoad: boolean) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appSliceActions.setLoad({ isLoad }));
  }, []);
};
