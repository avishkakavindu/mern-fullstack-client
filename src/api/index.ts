import axios from 'axios';

import { getAPIBaseURL } from '../configs';

// doc: https://axios-http.com/docs/instance
const instance = axios.create({
  baseURL: getAPIBaseURL(),
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
