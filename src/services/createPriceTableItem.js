import { request } from '../utils/request';

export default function createPriceTableItem({
  minDuration,
  maxDuration,
  unitPrice,
  description,
  priceTableId,
}) {
  const url = '/priceTableItems';

  return request
    .post(url, {
      minDuration: minDuration,
      maxDuration: maxDuration,
      unitPrice: unitPrice,
      description: description,
      priceTableId: priceTableId,
    })
    .then((response) => response)
    .catch((err) => err);
}
