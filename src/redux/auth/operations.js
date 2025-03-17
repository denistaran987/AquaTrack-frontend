import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://aquatrack-backend-1b8z.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
export const getTotalUsers = createAsyncThunk(
  "auth/getTotalUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/auth/totalUsers");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/signup', userData);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('Network error. Please check your connection.');
      }

      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred during login';

      return rejectWithValue({ status, message });
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/signin', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('Network error. Please check your connection.');
      }

      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred during login';

      return rejectWithValue({ status, message });
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  'auth/sendResetEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/send-reset-email', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/reset-pwd', { token, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/auth/logout');
    clearAuthHeader();
    localStorage.removeItem('persist:auth');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.post('/auth/refresh');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
