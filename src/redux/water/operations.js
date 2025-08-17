import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.config';

export const deleteWaterEntry = createAsyncThunk(
  'waterList/deleteEntry',
  async (entryId, thunkAPI) => {
    try {
      await api.delete(`/water/${entryId}`);
      return entryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterByDay = createAsyncThunk('water/day', async ({ date }, thunkAPI) => {
  try {
    const response = await api.get(`/water/day?date=${date}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getWaterByMonth = createAsyncThunk('water/month', async ({ date }, thunkAPI) => {
  try {
    const response = await api.get(`/water/month?date=${date}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const addWaterEntry = createAsyncThunk(
  'water/addEntry',
  async (entryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/water', entryData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editWaterEntry = createAsyncThunk(
  'water/editEntry',
  async ({ entryId, entryData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/water/${entryId}`, entryData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
