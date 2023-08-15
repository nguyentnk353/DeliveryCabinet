import axiosInstance from '../axiosInstance';

export default function getPriceTableBeforeRent(props) {
  const url = '/price-table-items';
  return axiosInstance
    .get(url, {
      params: {
        PageIndex: props?.PageIndex,
        // PageSize: props.PageSize,
        storeid: props.storeId,
        // 'BoxSize.Length' : props.length ,
        // 'BoxSize.Height' : props.height ,
        // 'BoxType.Name' : props.boxType,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
