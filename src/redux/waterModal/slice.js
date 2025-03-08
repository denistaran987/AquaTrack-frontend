import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "add", 
  initialValues: null, 
};

const waterModalSlice = createSlice({
  name: "waterModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.initialValues = action.payload.initialValues || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "add";
      state.initialValues = null;
    },
  },
});

export const { openModal, closeModal } = waterModalSlice.actions;
export default waterModalSlice.reducer;