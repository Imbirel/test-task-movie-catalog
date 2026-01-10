import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('API No Response:', {
        url: error.config?.url,
        message: 'No response from server',
      });
    } else {
      console.error('API Request Error:', error.message);
    }

    return Promise.reject(error);
  }
);
