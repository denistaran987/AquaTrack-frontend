import { createSlice } from '@reduxjs/toolkit';
import {
  deleteWaterEntry,
  addWaterEntry,
  editWaterEntry,
  getWaterByDay,
  getWaterByMonth,
} from './operations';

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
      .addCase(getWaterByDay.fulfilled, (state, { payload }) => {
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
      .addCase(addWaterEntry.pending, state => {
        state.isLoading = true;
      })
      .addCase(addWaterEntry.fulfilled, (state, { payload }) => {
        state.consumedWaterData.push(payload);
        state.todayProgress += payload.amount;
        state.isLoading = false;
      })
      .addCase(addWaterEntry.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(editWaterEntry.pending, state => {
        state.isLoading = true;
      })
      .addCase(editWaterEntry.fulfilled, (state, { payload }) => {
        const index = state.consumedWaterData.findIndex(entry => entry.id === payload.id);
        if (index !== -1) {
          const oldAmount = state.consumedWaterData[index].amount;
          state.consumedWaterData[index] = payload;
          state.todayProgress += payload.amount - oldAmount;
        }
        state.isLoading = false;
      })
      .addCase(editWaterEntry.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
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
