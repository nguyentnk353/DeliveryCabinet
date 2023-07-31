import axiosInstance from '../axiosInstance';

export default function getWallet() {
  const url = '/wallets';
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
