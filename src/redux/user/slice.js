import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './operations';

const initialState = {
  name: 'User',
  email: '',
  gender: '',
  dailyNorm: 1500,
  weight: 0,
  dailySportTime: 0,
  avatarUrl: '',
  isLoading: false,
  error: null,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
