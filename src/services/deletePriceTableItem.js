import { request } from '../utils/request';

export default function deletePriceTableItem(id) {
  const url = '/priceTableItems/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
