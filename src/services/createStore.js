import { request } from '../utils/request';

export default function createStore(api) {
  const url = '/stores';

  return request
    .post(url, api)
    .then((response) => response)
    .catch((err) => err);
}
