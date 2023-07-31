import { request } from '../utils/request';

export default function updateAccount(props) {
  const url = 'users';
  return request
    .put(url, {
      id: props.id,
      fullName: props.fullName,
      email: props.email,
      phone: props.phone,
      dob: props.dob,
      isEnable: props.isEnable,
      imgUrl: props.imgUrl,
    })
    .then((response) => response)
    .catch((err) => err.response);
}
