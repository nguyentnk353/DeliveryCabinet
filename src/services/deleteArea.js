import { request } from '../utils/request';

export default function deleteArea(id) {
  const url = 'areas/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
