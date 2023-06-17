import axiosInstance from './axiosInstance';

export default function deleteAccount(id) {
  const url = 'users/' + id;

  return axiosInstance
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
