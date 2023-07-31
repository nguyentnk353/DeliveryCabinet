import { request } from '../utils/request';

export default function deleteServiceType(id) {
  const url = '/service-types/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
