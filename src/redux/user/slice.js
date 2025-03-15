import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo, updateUserAvatar, updateUserInfo } from './operations';

const initialState = {
  _id: '',
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

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, handlePending)
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserInfo.rejected, handleRejected)
      .addCase(updateUserInfo.pending, handlePending)
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.avatarUrl = action.payload.avatarUrl ?? state.avatarUrl;
        state._id = action.payload._id || state._id;
        state.name = action.payload.name || state.name;
        state.email = action.payload.email || state.email;
        state.gender = action.payload.gender || state.gender;
        state.dailyNorm = action.payload.dailyNorm ?? state.dailyNorm;
        state.weight = action.payload.weight ?? state.weight;
        state.dailySportTime = action.payload.dailySportTime ?? state.dailySportTime;
        state.avatarUrl = action.payload.avatarUrl || state.avatarUrl;
      })
      .addCase(updateUserInfo.rejected, handleRejected)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarUrl = action.payload.avatarUrl ?? state.avatarUrl;
      })
      .addCase(updateUserAvatar.rejected, handleRejected);
  },
});

export default slice.reducer;
