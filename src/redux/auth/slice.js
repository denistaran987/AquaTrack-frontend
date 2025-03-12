import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { logout, registerUser, signInUser } from './operations.js';

const initialState = {
  email: '',
  token: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logout.pending, state => {
        state.token = null;
      })
      .addCase(logout.fulfilled, state => {
        Object.assign(state, initialState);
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, state => {
        state.token = null;
      })
      .addMatcher(isAnyOf(registerUser.pending, signInUser.pending), state => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addMatcher(isAnyOf(registerUser.rejected, signInUser.rejected), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export default slice.reducer;
