import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../auth/operations';
import i18next from 'i18next';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (token, thunkAPI) => {
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to get current user');
  }

  try {
    setAuthHeader(token);
    const response = await axios.get('/users/current');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch('/users', formData);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue(i18next.t('notifications.500'));
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue(i18next.t('notifications.500'));
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
