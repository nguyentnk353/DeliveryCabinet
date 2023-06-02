import axios from 'axios';
// import axiosInstance from './axiosInstance';

export default function getAccountList(props) {
  const url = 'https://deliver-store.tk/api/v1/users/public-paging';

  return axios
    .get(url, {
      params: {
        Role: props.Role,
        IsEnable: props.IsEnable,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
