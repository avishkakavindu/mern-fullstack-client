import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { persistor } from '@redux/store';
import { getAPIBaseURL } from '@configs/index';
import { getAuthTokens, removeAuthTokens } from '@utils/auth';

// doc: https://axios-http.com/docs/instance
const instance = axios.create({
  baseURL: getAPIBaseURL(),
  timeout: 30000, // 30 seconds
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add access and refresh tokens to request headers
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get authentication tokens
    const tokens = getAuthTokens();

    // Add access token to headers if available
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    // Add refresh token to headers if available
    if (tokens?.refreshToken) {
      config.headers['Refresh-Token'] = tokens.refreshToken;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle authorization failures
instance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  (error: AxiosError) => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response?.status && error.response.status === 401) {
      // remove all stored tokens
      removeAuthTokens();
      // reset persisted redux states, this will trigger routes logic in App.tsx
      persistor.purge();
    }
    // Return the error
    return Promise.reject(error);
  },
);

export default instance;
