import axios from 'axios';
import axiosInstance from './axiosInstance';
export default function postAccount(props) {
    const url = 'https://deliver-store.tk/api/v1/users';
    
    return axiosInstance
        .post(url, {
            loginName: props.loginName,
            password: props.password,
            confirmPassword: props.confirmPassword,
            fullName: props.fullName,
            email: props.email,
            phone: props.phone,
            dob: props.dob,
            role: props.role
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
}