import { createSlice } from '@reduxjs/toolkit';
import { addWaterEntry, editWaterEntry, getWaterByDay, getWaterByMonth } from './operations';

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
    .addCase(addWaterEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWaterEntry.fulfilled, (state, { payload }) => {
        state.consumedWaterDataArray.push(payload); 
        state.isLoading = false;
      })
      .addCase(addWaterEntry.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
    .addCase(editWaterEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editWaterEntry.fulfilled, (state, { payload }) => {
        const index = state.consumedWaterDataArray.findIndex(
          (entry) => entry.id === payload.id
        );
        if (index !== -1) {
          state.consumedWaterDataArray[index] = payload; 
        }
        state.isLoading = false;
      })
      .addCase(editWaterEntry.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
  },
});

export default slice.reducer;