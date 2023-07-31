import axios from 'axios';
import { request } from '../utils/request';

export default function getStaffByStore(payload) {
  // const url = '/stores';
  const url = 'https://deliver-store.tk/storeowner/api/v1/users';

  return axios
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
