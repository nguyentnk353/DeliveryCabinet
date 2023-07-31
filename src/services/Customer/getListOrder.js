import axiosInstance from '../axiosInstance';

export default function getListOrder(props) {
  const url = '/orders';
  return axiosInstance
    .get(url, {
      params: {                  
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
        status: props.status,   
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
