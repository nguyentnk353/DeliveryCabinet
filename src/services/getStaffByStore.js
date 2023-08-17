import axios from 'axios';
import { request } from '../utils/request';
import { requestOwner } from '../utils/requestOwner';

export default function getStaffByStore(payload) {
  // const url = '/stores';
  const url = '/v1/users';

  return requestOwner
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
