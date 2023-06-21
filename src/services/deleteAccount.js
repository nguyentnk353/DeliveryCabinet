import { request } from '../utils/request';

export default function deleteAccount(id) {
  const url = 'users/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
