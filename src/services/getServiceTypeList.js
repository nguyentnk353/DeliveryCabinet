import { request } from '../utils/request';

export default function getServiceTypeList(paylod) {
  const url = '/service-types';

  return request
    .get(url, {
      params: paylod,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
