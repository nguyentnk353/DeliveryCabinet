import axiosInstance from '../axiosInstance';

export default function getPriceTable(props) {
  const url = '/price-table-items';
  return axiosInstance
    .get(url, {
      params: {
        storeid: props.storeId,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
