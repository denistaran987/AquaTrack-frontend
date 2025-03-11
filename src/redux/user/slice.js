import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'User',
    email: '',
    gender: '',
    dailyNorm: 1.5,
    weight: 0,
    dailySportTime: 0,
  },
  avatarURL: '',
  isLoading: false,
};

export const slice = createSlice({
  name: 'user',
  initialState,
});

export default slice.reducer;
