import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getStoreList(props) {
  const url = 'https://deliver-store.tk/api/v1/stores/store-paging';

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
