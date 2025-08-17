import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice';
import userReducer from './user/slice';
import waterReducer from './water/slice';
import modalReducer from './modal/slice';
import themeReducer from './theme/slice';
import { setupInterceptors } from '../utils/axios.config';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: userReducer,
    modal: modalReducer,
    water: waterReducer,
    theme: themeReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
setupInterceptors(store.getState, store.dispatch);
