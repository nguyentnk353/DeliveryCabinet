import { request } from '../utils/request';

export default function deleteBoxSize(id) {
  const url = '/box-sizes/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
