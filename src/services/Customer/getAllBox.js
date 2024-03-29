import axiosInstance from '../axiosInstance';

export default function getAllBox(storeId) {
  const url = `boxs/store/${storeId}/typebox`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
