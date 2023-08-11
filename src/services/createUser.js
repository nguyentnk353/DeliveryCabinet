import { request } from '../utils/request';

export default function createUser(payload) {
  const url = '/users';

  return request
    .post(url, payload)
    .then((response) => response)
    .catch((err) => err);
}
