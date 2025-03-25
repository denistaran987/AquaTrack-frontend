import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

axios.defaults.baseURL = 'https://aquatrack-backend-1b8z.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    const { t } = useTranslation();
    try {
      const response = await axios.post('/auth/signup', userData);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(t('validation.network_error'));
      }

      const status = error.response.status;
      const message = error.response.data?.message || t('validation.error_login');

      return rejectWithValue({ status, message });
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    const { t } = useTranslation();
    try {
      const response = await axios.post('/auth/signin', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(t('validation.network_error'));
      }

      const status = error.response.status;
      const message = error.response.data?.message || t('validation.error_login');

      return rejectWithValue({ status, message });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/auth/logout');
    clearAuthHeader();
    localStorage.removeItem('persist:auth');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    const { t } = useTranslation();
    return thunkAPI.rejectWithValue(t('validation.unable_fetch_user'));
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.post('/auth/refresh');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getTotalUsers = createAsyncThunk('auth/getLTotalUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/auth/totalUsers');
    return response.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data);
  }
});

export const sendResetEmail = createAsyncThunk(
  'auth/sendResetEmail',
  async (email, { rejectWithValue }) => {
    const { t } = useTranslation();
    try {
      const response = await axios.post('/auth/send-reset-email', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || t('validation.reset_email'));
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    const { t } = useTranslation();
    try {
      const response = await axios.post('/auth/reset-pwd', { token, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || t('validation.reset_password'));
    }
  }
);
