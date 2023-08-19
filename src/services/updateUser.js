import { request } from '../utils/request';

export default function updateUser(payload) {
  const url = '/users';

  return request
    .put(url, payload)
    .then((response) => response)
    .catch((err) => err);
}
