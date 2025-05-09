import axios from 'axios';

// Set up Axios instance
const baseURL = `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1`;
const instance = axios.create({ baseURL });

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export { instance };