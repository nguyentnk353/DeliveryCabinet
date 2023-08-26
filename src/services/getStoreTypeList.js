import { request } from '../utils/request';

export default function getStoreTypeList(payload) {
  const url = '/store-types';
  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
