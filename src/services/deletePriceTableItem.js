import { request } from '../utils/request';

export default function deletePriceTableItem(id) {
  const url = '/price-table-items/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
