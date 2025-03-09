import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isOpen = state.isOpen === action.payload ? null : action.payload;
    },
  },
});

export const { toggleModal } = slice.actions;
export default slice.reducer;
