import axiosInstance from '../axiosInstance';

export default function getTransaction(props) {
  // console.log(props)
  const url = `/wallets/${props?.walletId}/transactions`;
  return axiosInstance
    .get(url, {
      params:{
        PageSize: props?.PageSize,
      }
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
