import axios from 'axios';
export const requestOwner = axios.create({
  baseURL: 'https://deliver-store.tk/storeowner/api/',
});
requestOwner.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
