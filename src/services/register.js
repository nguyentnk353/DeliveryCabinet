import { loginRequest } from '../utils/loginRequest';

export default function register(payload) {
  const url = '/user/register';
  return loginRequest
    .post(url, payload)
    .then((response) => response)
    .catch((err) => err.response.data);
}
