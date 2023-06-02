import axios from "axios";

const axiosInstance = axios.create({
    
})

axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('token');
    if(config.headers && token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosInstance;