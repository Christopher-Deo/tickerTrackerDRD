import axios from 'axios';
import getCSRFToken from './getCSRFToken';

const axiosInstance = axios.create({
  baseURL: 'http://backend:8000', //  Django backend URL from docker compose build
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
  console.log(error)
    return Promise.reject(error);
  }
);

export default axiosInstance;
