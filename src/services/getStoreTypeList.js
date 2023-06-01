import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getStoreTypeList(props) {
  const url = 'https://deliver-store.tk/api/v1/storeTypes/storeType-paging';
  return axios
    .get(url, {
      params: {
        IsEnable: props.IsEnable,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
