import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
