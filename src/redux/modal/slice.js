import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: null,
  position: null,
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isOpen = state.isOpen === action.payload ? null : action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { toggleModal, setPosition } = slice.actions;
export default slice.reducer;
