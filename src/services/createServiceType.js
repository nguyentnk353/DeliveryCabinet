import { request } from '../utils/request';
export default function createServiceType({ price, description }) {
  const url = '/serviceTypes';

  return request
    .post(url, {
      price: price,
      description: description,
    })
    .then((response) => response)
    .catch((err) => err);
}
