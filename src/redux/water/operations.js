import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthHeader } from '../auth/operations';

export const deleteWaterEntry = createAsyncThunk(
  'waterList/deleteEntry',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/water/${entryId}`);
      return entryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterByDay = createAsyncThunk('water/day', async ({ date, token }, thunkAPI) => {
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to get current user');
  }

  try {
    setAuthHeader(token);
    const response = await axios.get(`/water/day?date=${date}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getWaterByMonth = createAsyncThunk(
  'water/month',
  async ({ date, token }, thunkAPI) => {
    if (!token) {
      return thunkAPI.rejectWithValue('Unable to get current user');
    }

    try {
      setAuthHeader(token);
      const response = await axios.get(`/water/month?date=${date}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
