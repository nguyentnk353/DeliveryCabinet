import { request } from '../utils/request';

export default function getPriceTableItemList(payload) {
  const url = '/price-table-items';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
