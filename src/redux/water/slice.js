import { createSlice } from '@reduxjs/toolkit';
import { getWaterByDay, getWaterByMonth } from './operations';

const initialState = {
  todayWaterNotesArray: [],
  noTodayWaterNotesArray: [],
  todayProgress: 0,
  isLoading: false,
  currentDate: null,
  consumedWaterData: [],
  error:{},
  monthWaterData: [],
};

export const slice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getWaterByDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWaterByDay.fulfilled, (state, {payload}) => {
       state.consumedWaterData = payload.consumedWaterData;
       state.currentDate = payload.currentDate;
       state.todayProgress = payload.totalDayWater;
       state.isLoading = false;
      })
      .addCase(getWaterByDay.rejected, (state, {payload}) => {
        state.error = payload;
      })

      .addCase(getWaterByMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWaterByMonth.fulfilled, (state, {payload}) => {
       state.monthWaterData = payload;
       state.isLoading = false;
      })
      .addCase(getWaterByMonth.rejected, (state, {payload}) => {
        state.error = payload;
      })
  },
});

export default slice.reducer;