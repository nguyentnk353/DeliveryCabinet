import { request } from '../utils/request';

export default function deleteServiceType(id) {
  const url = '/serviceTypes/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
