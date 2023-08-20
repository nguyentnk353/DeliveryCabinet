import { request } from '../utils/request';

export default function getUserList(payload) {
  const url = '/users';

  return request
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
