import axiosInstance from '../axiosInstance';

export default function openBox(boxId) {
  const url = `/boxs/${boxId}/open-box`;
  return axiosInstance
    .put(url)
    .then((response) => response)
    .catch((err) => err.response);
}
