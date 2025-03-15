import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
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
import { setupAxiosInterceptors } from './auth/operations';

const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['token'],
};

export const resetStore = createAction('RESET_STORE');

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  modal: modalReducer,
  water: waterReducer,
});

const rootReducerWithReset = (state, action) => {
  if (action.type === resetStore.type) {
    return (state = undefined);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducerWithReset,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);
