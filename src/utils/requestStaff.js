import axios from 'axios';
export const requestStaff = axios.create({
  baseURL: 'https://deliver-store.tk/staff/api/v1/',
});
requestStaff.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
