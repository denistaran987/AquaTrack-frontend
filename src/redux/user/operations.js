import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../auth/operations';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (token, thunkAPI) => {
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to get current user');
  }

  try {
    setAuthHeader(token);
    const response = await axios.get('/users/current');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
