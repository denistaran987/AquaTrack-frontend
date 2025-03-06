import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenModalSettings: false,
    isOpenModalLogout: false,
    isOpenModalAddWater: false,
  },
  reducers: {
    openModalSettings: state => {
      state.isOpenModalSettings = true;
    },
    closeModalSettings: state => {
      state.isOpenModalSettings = false;
    },

    openModalLogout: state => {
      state.isOpenModalLogout = true;
    },
    closeModalLogout: state => {
      state.isOpenModalLogout = false;
    },
    openModalAddWater: state => {
      state.isOpenModalAddWater = true;
    },
    closeModalAddWater: state => {
      state.isOpenModalAddWater = false;
    },
  },
});

export const {
  openModalSettings,
  closeModalSettings,
  openModalLogout,
  closeModalLogout,
  openModalAddWater,
  closeModalAddWater,
} = modalSlice.actions;

export default modalSlice.reducer;
