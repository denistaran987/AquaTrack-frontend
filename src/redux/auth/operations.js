import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://aquatrack-backend-1b8z.onrender.com/auth';

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
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

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, userData);
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    clearAuthHeader();
    localStorage.removeItem('persist:root');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
