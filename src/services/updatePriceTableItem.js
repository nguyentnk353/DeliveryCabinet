import { request } from '../utils/request';

export default function updatePriceTableItem({
  id,
  minDuration,
  maxDuration,
  unitPrice,
  description,
  priceTableId,
  isEnable,
}) {
  const url = '/priceTableItems';

  return request
    .put(url, {
      id: id,
      minDuration: minDuration,
      maxDuration: maxDuration,
      unitPrice: unitPrice,
      description: description,
      priceTableId: priceTableId,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
