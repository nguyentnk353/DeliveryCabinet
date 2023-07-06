import { request } from '../utils/request';

export default function deletePriceTable(id) {
  const url = '/price-tables/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
