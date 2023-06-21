import { request } from '../utils/request';

export default function deleteServiceConfig(id) {
  const url = '/serviceConfigs/' + id;

  return request
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
