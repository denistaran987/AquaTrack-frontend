import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waterRecords: [], 
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    addWater: (state, action) => {
      state.waterRecords.push({
        id: Date.now(), 
        ...action.payload, 
      });
    },
    updateWater: (state, action) => {
      const index = state.waterRecords.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.waterRecords[index] = action.payload;
      }
    },
  },
});

export const { addWater, updateWater } = waterSlice.actions;
export default waterSlice.reducer;