import { request } from '../utils/request';

export default function getOrderList(payload) {
  const url = '/orders';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
