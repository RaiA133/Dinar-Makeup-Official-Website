import axios from 'axios';
import Cookies from 'js-cookie';

// Set up Axios instance
const baseURL = `${import.meta.env.VITE_VERTEXAI_CHATBOT_BACKEND_BASEURL}/api/v1`;
const instance = axios.create({
  baseURL,
});

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export { instance };