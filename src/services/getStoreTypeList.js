import { request } from '../utils/request';

export default function getStoreTypeList(props) {
  const url = '/storeTypes/storeType-paging';
  return request
    .get(url, {
      params: {
        Name: props.search,
        IsEnable: props.IsEnable,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
