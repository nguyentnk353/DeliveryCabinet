import axiosInstance from '../axiosInstance';

export default function getTransaction(walletId) {
  const url = `/wallets/${walletId}/transactions`;
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
