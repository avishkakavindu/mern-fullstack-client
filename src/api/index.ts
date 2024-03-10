import axios from 'axios';
import { getAPIBaseURL } from '@configs/index';

// doc: https://axios-http.com/docs/instance
const instance = axios.create({
  baseURL: getAPIBaseURL(),
  timeout: 30000, // 30 seconds
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
