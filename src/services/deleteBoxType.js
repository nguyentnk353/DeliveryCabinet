import { request } from '../utils/request';

export default function deleteBoxType(id) {
  const url = '/box-types/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
