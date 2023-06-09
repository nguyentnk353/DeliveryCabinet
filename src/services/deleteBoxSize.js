import { request } from '../utils/request';

export default function deleteBoxSize(id) {
  const url = '/boxSizes/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
