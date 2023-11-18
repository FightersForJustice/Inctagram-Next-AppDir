import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  accessToken: string;
};

const initialState: { userData: User } = {
  userData: {
    accessToken: '',
  },
};

const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<User>) => {
      state.userData = {
        ...state.userData,
        accessToken: action.payload.accessToken,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setAccessToken } = userSlice.actions;
