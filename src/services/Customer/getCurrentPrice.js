import axiosInstance from '../axiosInstance';

export default function getCurrentPrice(orderId) {
  const url = `orders/${orderId}/price`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
