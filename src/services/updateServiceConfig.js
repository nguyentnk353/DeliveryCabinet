import { request } from '../utils/request';

export default function updateServiceConfig({
  id,
  serviceTyeId,
  priceTableId,
  priority,
  applyFrom,
  applyTo,
  isEnable,
}) {
  const url = '/service-configs';

  return request
    .put(url, {
      id: id,
      serviceTyeId: serviceTyeId,
      priceTableId: priceTableId,
      priority: priority,
      applyFrom: applyFrom,
      applyTo: applyTo,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
