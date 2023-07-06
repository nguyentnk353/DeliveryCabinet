import { request } from '../utils/request';
export default function createServiceType({ price, description }) {
  const url = '/service-types';

  return request
    .post(url, {
      price: price,
      name: description,
    })
    .then((response) => response)
    .catch((err) => err);
}
