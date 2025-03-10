import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noTodayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'monthData',
  initialState,
});

export default slice.reducer;
