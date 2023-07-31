import axiosInstance from '../axiosInstance';

export default function completeOrder(orderId) {
  const url = '/orders';
  return axiosInstance
    .put(url, {},
        {params: {
            orderid: orderId       
        },}
    )
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
