import { requestOwner } from './../../utils/requestOwner';

export default function getOrderByOwner(payload) {
  const url = '/orders';

  return requestOwner
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
