import { request } from '../utils/request';

export default function getOrderIncome(payload) {
  const url = '/orders/income';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
