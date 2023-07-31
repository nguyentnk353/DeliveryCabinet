import axiosInstance from '../axiosInstance';

export default function getAllLocker(storeId) {
  const url = `/lockers?StoreId=${storeId}`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
