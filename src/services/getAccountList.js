import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getAccountList(props) {
  const url = 'https://deliver-store.tk/api/v1/users/public-paging';

  return axios
    .get(url, {
      params: {
        PageIndex: '1',
        PageSize: '10',
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
