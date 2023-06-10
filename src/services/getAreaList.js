import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getAreaList(props) {
  const url = 'https://deliver-store.tk/api/v1/areas/area-paging';
  return axios
    .get(url, {
      params: {
        Name: props.search,
        IsEnable: props.IsEnable,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
