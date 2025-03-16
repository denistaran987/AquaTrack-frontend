import { createSlice } from '@reduxjs/toolkit';
import { deleteWaterEntry, getWaterByDay, getWaterByMonth } from './operations';

const initialState = {
  todayWaterNotesArray: [],
  noTodayWaterNotesArray: [],
  waterId: null,
  todayProgress: 0,
  isLoading: false,
  currentDate: '',
  consumedWaterData: [],
  error: {},
  monthWaterData: [],
};

export const slice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.waterId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWaterByDay.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByDay.fulfilled, (state, {payload}) => {
       state.consumedWaterData = payload.consumedWaterData;
       state.currentDate = payload.date;
       state.todayProgress = payload.totalDayWater;
       state.isLoading = false;
      })
      .addCase(getWaterByDay.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getWaterByMonth.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByMonth.fulfilled, (state, { payload }) => {
        state.monthWaterData = payload;
        state.isLoading = false;
      })
      .addCase(getWaterByMonth.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(deleteWaterEntry.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteWaterEntry.fulfilled, (state, { payload }) => {
        state.consumedWaterData = state.consumedWaterData.filter(item => item._id !== payload);
        state.isLoading = false;
      })
      .addCase(deleteWaterEntry.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setId } = slice.actions;
export default slice.reducer;
