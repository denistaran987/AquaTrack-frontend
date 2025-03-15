import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todayWaterNotesArray: [],
  noTodayWaterNotesArray: [],
  monthData: [],
  todayProgress: 0,
  isLoading: false,
};

export const slice = createSlice({
  name: 'water',
  initialState,
});

export default slice.reducer;
