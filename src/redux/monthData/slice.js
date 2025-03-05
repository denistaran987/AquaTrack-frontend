import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noTodayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'monthData',
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default slice.reducer;
