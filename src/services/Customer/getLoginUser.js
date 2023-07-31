import axiosInstance from '../axiosInstance';

export default function getLoginUser() {
  const url = '/user';
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
