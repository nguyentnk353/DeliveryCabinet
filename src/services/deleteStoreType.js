import axiosInstance from './axiosInstance';

export default function deleteStoreType(id) {
  const url = 'storeTypes/' + id;

  return axiosInstance
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}
