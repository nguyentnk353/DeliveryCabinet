import { loginRequest } from '../utils/loginRequest';

export default function login(payload) {
  const url = '/user/authenticate';

  return loginRequest
    .post(
      url,
      {},
      {
        params: payload,
      }
    )
    .then((response) => response)
    .catch((err) => err.response.data);
}
