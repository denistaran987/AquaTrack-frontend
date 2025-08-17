import axios from 'axios';
import { refreshUser } from '../redux/auth/operations';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const setupInterceptors = (getState, dispatch) => {
  api.interceptors.request.use(
    config => {
      const { accessToken } = getState().auth;

      if (!config.url.includes('/auth/') && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );

  api.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;

      if (originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry &&
        getState().auth.isLoggedIn
      ) {
        originalRequest._retry = true;
        try {
          await dispatch(refreshUser()).unwrap();
          return api(originalRequest);
        } catch (err) {
          console.error('Refresh failed:', err);
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
