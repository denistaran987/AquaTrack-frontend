import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTotalUsers, logout, refreshUser, registerUser, signInUser } from './operations.js';

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
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
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
      .addCase(getTotalUsers.fulfilled, (state, { payload }) => {
        state.toalUsers = payload.data;
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

export const { setCredentials } = slice.actions;

export default slice.reducer;
