import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  gender: '',
  dailyNorm: '',
  weight: '',
  time: null,
  avatarUrl: '',
  token: null,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default slice.reducer;
