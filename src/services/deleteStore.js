import { request } from '../utils/request';

export default function deleteStore(storeId) {
  const url = '/stores/' + storeId;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
