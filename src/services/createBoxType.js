import { request } from '../utils/request';

export default function createBoxType({ name, multiplyPrice }) {
  const url = '/box-types';

  return request
    .post(url, {
      name: name,
      multiplyPrice: multiplyPrice,
    })
    .then((response) => response)
    .catch((err) => err);
}
