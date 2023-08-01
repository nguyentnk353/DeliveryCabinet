// import { request } from '../utils/request';

import axios from 'axios';

export default function getLockerIdGuest(payload) {
  //   const url = 'users/' + id;
  const url = 'https://deliver-store.tk/customer/api/v1/lockers';
  return axios
    .get(url, {
      params: payload,
    })
    .then((response) => response)
    .catch((err) => err);
}
