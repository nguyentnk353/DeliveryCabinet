import { request } from '../utils/request';

export default function createPriceTable(data) {
  const url = '/price-tables';
  return request
    .post(url, data)
    .then((response) => response)
    .catch((err) => err);
}
