import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todayWaterNotesArray: [],
};

export const slice = createSlice({
  name: 'todayWaterList',
  initialState,
  //extraReducers: builder => {
    //builder.addCase();
 // },
});

export default slice.reducer;
