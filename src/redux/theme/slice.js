import { createSlice } from '@reduxjs/toolkit';

const initialState = { theme: localStorage.getItem('theme') || 'light' };

export const slice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export default slice.reducer;
export const { toggleTheme } = slice.actions;
