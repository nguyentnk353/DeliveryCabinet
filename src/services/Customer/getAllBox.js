import axiosInstance from '../axiosInstance';

export default function getAllBox(lockerId) {
  const url = `boxs/locker/${lockerId}/typebox`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
