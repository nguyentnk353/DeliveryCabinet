import { request } from '../utils/request';

export default function getLockerList(payload) {
  const url = '/lockers';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
