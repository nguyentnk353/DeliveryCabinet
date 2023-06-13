import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://deliver-store.tk/api/v1/',
})

axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('token');
    if(config.headers && token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosInstance;