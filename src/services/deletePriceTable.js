import { request } from '../utils/request';

export default function deletePriceTable(id) {
  const url = '/priceTables' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
