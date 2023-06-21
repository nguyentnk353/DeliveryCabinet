import axios from 'axios';
export const loginRequest = axios.create({
  baseURL: 'https://deliver-store.tk/api/v1',
});
loginRequest.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
