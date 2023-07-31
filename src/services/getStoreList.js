import { request } from '../utils/request';

export default function getStoreList(payload) {
  const url = '/stores';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
