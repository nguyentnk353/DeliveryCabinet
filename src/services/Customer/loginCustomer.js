import { loginRequest } from "../../utils/loginRequest";

export default function loginCustomer(idToken) {
  const url = '/user/email-authenticate';
  const postData = {};
  const error = { error: 'login-fail' };
  return loginRequest
    .post(url, postData, {
      params: {
        idToken: idToken,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
