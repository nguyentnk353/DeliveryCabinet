import { request } from '../utils/request';

export default function updateServiceType({
  id,
  name,
  price,
  description,
  isEnable,
}) {
  const url = '/serviceTypes/';

  return request
    .put(url, {
      id: id,
      price: price,
      description: description,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
