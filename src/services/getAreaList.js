import { request } from '../utils/request';

export default function getAreaList(payload) {
  const url = '/areas';
  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
