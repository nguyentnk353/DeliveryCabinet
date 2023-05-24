import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getBoxTypeList(props) {
  const url = 'https://deliver-store.tk/api/v1/boxTypes/boxType-paging';

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
