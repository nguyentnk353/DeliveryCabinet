import { request } from '../utils/request';

export default function deleteStoreType(id) {
  const url = '/store-types/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
