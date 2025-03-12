import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteWaterEntry = createAsyncThunk(
  'waterList/deleteEntry',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/${entryId}`);
      return entryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
