import { request } from '../utils/request';

export default function getAccountById(id) {
  const url = 'users/' + id;
  return request
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
