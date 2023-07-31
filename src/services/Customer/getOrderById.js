import axiosInstance from '../axiosInstance';

export default function getOrderById(orderId) {
  const url = '/orders/' + `${orderId}`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
