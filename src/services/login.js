import axios from 'axios';
import { request } from '../utils/request';

export default function login(props) {
  const url = 'https://deliver-store.tk/api/v1/user/authenticate';
  const LoginName = props.loginName;
  const Password = props.password;
  const postData = {};
  const error = { error: 'login-fail' };
  return axios
    .post(url, postData, {
      params: {
        loginName: LoginName,
        password: Password,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
