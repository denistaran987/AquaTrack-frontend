import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import userReducer from './user/slice';
import waterReducer from './water/slice';
import modalReducer from './modal/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    water: waterReducer,
    modal: modalReducer,
  },
});
