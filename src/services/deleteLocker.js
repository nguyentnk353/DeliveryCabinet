import { request } from '../utils/request';

export default function deleteLocker(id) {
  const url = '/lockers/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
