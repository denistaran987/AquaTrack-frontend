import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noTodayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'waterList',
  initialState,
  //extraReducers: builder => {
    //builder.addCase();
  //},
});

export default slice.reducer;
