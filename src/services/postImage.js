import { loginRequest } from '../utils/loginRequest';

export default function postImage({ file }) {
  const url = '/images/api/images/upload';

  return loginRequest
    .post(url, JSON.stringify(file))
    .then((response) => response)
    .catch((err) => err);
}
