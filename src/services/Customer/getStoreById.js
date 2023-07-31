import axiosInstance from '../axiosInstance';

export default function getStoreById(storeId) {
  const url = '/stores/' + `${storeId}`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
