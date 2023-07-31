import axios from 'axios';
import { request } from '../utils/request';

export default function createStaff(payload) {
  // const url = '/stores';
  const url = 'https://deliver-store.tk/storeowner/api/v1/users';

  return axios
    .post(url, payload)
    .then((response) => response)
    .catch((err) => err);
}
