import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'todayWaterList',
  initialState,
});

export default slice.reducer;
