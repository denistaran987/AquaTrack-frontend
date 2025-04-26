import { createSlice } from '@reduxjs/toolkit';
import {
  deleteWaterEntry,
  addWaterEntry,
  editWaterEntry,
  getWaterByDay,
  getWaterByMonth,
} from './operations';

const initialState = {
  consumedWaterData: [],
  monthWaterData: [],
  waterId: null,
  todayProgress: 0,
  isLoading: false,
  currentDate: '',
  error: {},
};

export const slice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.waterId = action.payload;
    },
    addTotalDayWater: (state, action) => {
      const { date, amount } = action.payload;
      const isDayExist = state.monthWaterData.find(
        day => day.date.split('T')[0] === date.split('T')[0]
      );
      let newMonthWaterData = [];
      if (isDayExist) {
        newMonthWaterData = state.monthWaterData.map(day => {
          if (day.date.split('T')[0] === date.split('T')[0]) {
            return { date: day.date, totalDayWater: day.totalDayWater + amount };
          } else {
            return day;
          }
        });
      } else {
        newMonthWaterData = [...state.monthWaterData, { date, totalDayWater: amount }];
      }

      state.monthWaterData = newMonthWaterData;
    },
    removeTotalDayWater: (state, action) => {
      const { date, amount } = action.payload;
      const targetDate = date.split('T')[0];

      const newMonthWaterData = state.monthWaterData.map(day => {
        if (day.date.split('T')[0] === targetDate) {
          const newAmount = day.totalDayWater - amount;
          return {
            ...day,
            totalDayWater: newAmount >= 0 ? newAmount : 0,
          };
        }
        return day;
      });

      state.todayProgress = state.todayProgress - amount;
      state.monthWaterData = newMonthWaterData;
    },
    editTotalDayWater: (state, action) => {
      const { _id, amount, date } = action.payload;
      const currentNote = state.consumedWaterData.find(note => _id === note._id);
      currentNote.amount = amount;
      currentNote.date = date;
      const waterDataWithoutCurrentNote = state.consumedWaterData.filter(note => _id !== note._id);
      state.consumedWaterData = [...waterDataWithoutCurrentNote, currentNote];
      const newProgress = [...waterDataWithoutCurrentNote, currentNote].reduce(
        (acc, { amount }) => acc + amount,
        0
      );

      const newMonthWaterData = state.monthWaterData.map(day => {
        if (day.date.split('T')[0] === date.split('T')[0]) {
          const newAmount = newProgress;
          return {
            ...day,
            totalDayWater: newAmount >= 0 ? newAmount : 0,
          };
        }
        return day;
      });

      state.todayProgress = newProgress;
      state.totalDayWater = newProgress;
      state.monthWaterData = newMonthWaterData;
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
      .addCase(editWaterEntry.fulfilled, state => {
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

export const { setId, addTotalDayWater, removeTotalDayWater, editTotalDayWater } = slice.actions;

export default slice.reducer;
