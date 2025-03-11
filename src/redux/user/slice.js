import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './operations';

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
        state.gender = action.payload.gender;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.dailyNorm = action.payload.dailyNorm;
        state.weight = action.payload.dailyNorm;
        state.avatarURL = action.payload.avatarURL;
        state.dailySportTime = action.payload.dailySportTime;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
