import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './auth/slice';
import waterListReducer from './waterList/slice';
import todayWaterListReducer from './todayWaterList/slice';
import monthDataReducer from './monthData/slice';
import modalReducer from './modal/slice';




export const store = configureStore({
  reducer: {
    auth: registerReducer,
    waterList: waterListReducer,
    todayWaterList: todayWaterListReducer,
    monthData: monthDataReducer,
    modal: modalReducer,
                 
  },
});
