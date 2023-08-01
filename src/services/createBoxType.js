import { request } from '../utils/request';

export default function createBoxType(payload) {
  const url = '/box-types';

  return request
    .post(url, payload)
    .then((response) => response)
    .catch((err) => err);
}
