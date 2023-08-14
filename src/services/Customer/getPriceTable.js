import axiosInstance from '../axiosInstance';

export default function getPriceTable(props) {
  const url = '/price-table-items/past-order';
  return axiosInstance
    .get(url, {
      params: {
        PageIndex: props?.PageIndex,
        priceTableId: props?.priceTableId,
        // PageSize: props.PageSize,
        // storeid: props.storeId,
        // 'BoxSize.Length' : props.length ,
        // 'BoxSize.Height' : props.height ,
        // 'BoxType.Name' : props.boxType,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
