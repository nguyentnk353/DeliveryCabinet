import { request } from '../utils/request';

export default function updateServiceType({ id, name, price, isEnable }) {
  const url = '/service-types/';

  return request
    .put(url, {
      id: id,
      price: price,
      name: name,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
