import { request } from '../utils/request';
export default function createServiceType(payload) {
  const url = '/service-types';

  return request
    .post(url, payload)
    .then((response) => response)
    .catch((err) => err);
}
