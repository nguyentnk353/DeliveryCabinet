import axiosInstance from '../axiosInstance';

export default function getOpenCode(orderId) {
  const url = `orders/${orderId}/opencode`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
