import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://aquatrack-backend-1b8z.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (token, thunkAPI) => {
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to get current user');
  }

  try {
    setAuthHeader(token);
    const response = await axios.get('/user/current');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
