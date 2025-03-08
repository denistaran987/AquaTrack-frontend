import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noTodayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'waterList',
  initialState,
});

export default slice.reducer;
