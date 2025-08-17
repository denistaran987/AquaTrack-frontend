import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getTotalUsers,
  logout,
  refreshUser,
  registerUser,
  signInUser,
  signInWithGoogle,
} from './operations.js';
import { clearAuthHeader } from '../../utils/axios.config.js';

const initialState = {
  email: '',
  totalUsers: null,
  accessToken: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      clearAuthHeader();
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getTotalUsers.fulfilled, (state, { payload }) => {
        state.totalUsers = payload.totalUsers;
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        if (!payload || !payload.length) state.isLoggedIn = false;
        state.accessToken = payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.pending, state => {
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        Object.assign(state, initialState);
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, state => {
        Object.assign(state, initialState);
        state.isLoggedIn = false;
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

export const { logoutUser } = slice.actions;
export default slice.reducer;
