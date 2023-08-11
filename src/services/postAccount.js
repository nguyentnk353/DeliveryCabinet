import { request } from '../utils/request';
export default function postAccount(props) {
  const url = '/users';

  return request
    .post(url, {
      loginName: props.loginName,
      password: props.password,
      confirmPassword: props.confirmPassword,
      fullName: props.fullName,
      email: props.email,
      phone: props.phone,
      dob: props.dob,
      role: props.role,
    })
    .then((response) => response)
    .catch((err) => err);
}
