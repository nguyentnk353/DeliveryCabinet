import { loginRequest } from '../utils/loginRequest';

export default function loginGoogle(payload) {
  const url = '/user/email-authenticate';

  return loginRequest
    .post(
      url,
      {},
      {
        params: payload,
      }
    )
    .then((response) => response)
    .catch((err) => err.response);
}
