import { request } from '../utils/request';

export default function updatePriceTable({
  id,
  name,
  applyFrom,
  applyTo,
  dateFilter,
  isEnable,
}) {
  const url = '/priceTables';

  return request
    .put(url, {
      id: id,
      name: name,
      applyFrom: applyFrom,
      applyTo: applyTo,
      dateFilter: dateFilter,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
