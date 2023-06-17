import axiosInstance from './axiosInstance';

export default function getAccountById(id) {
  const url = 'users/' + id;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
