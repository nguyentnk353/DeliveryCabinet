import { request } from '../utils/request';

export default function getAreaList(props) {
  const url = '/areas/area-paging';
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
