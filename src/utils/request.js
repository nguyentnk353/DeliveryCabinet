import axios from 'axios';
export const request = axios.create({
  baseURL: 'https://deliver-store.tk/admin/api/',
});
request.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
