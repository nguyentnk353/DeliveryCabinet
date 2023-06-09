import { request } from '../utils/request';

export default function createPriceTable({
  name,
  applyFrom,
  applyTo,
  dateFilter,
}) {
  const url = '/priceTables';

  return request
    .post(url, {
      name: name,
      applyFrom: applyFrom,
      applyTo: applyTo,
      dateFilter: dateFilter,
    })
    .then((response) => response)
    .catch((err) => err);
}
