import { request } from '../utils/request';

export default function createServiceConfig({
  serviceTyeId,
  priceTableId,
  priority,
  applyFrom,
  applyTo,
}) {
  const url = '/service-configs';

  return request
    .post(url, {
      serviceTyeId: serviceTyeId,
      priceTableId: priceTableId,
      priority: priority,
      applyFrom: applyFrom,
      applyTo: applyTo,
    })
    .then((response) => response)
    .catch((err) => err);
}
