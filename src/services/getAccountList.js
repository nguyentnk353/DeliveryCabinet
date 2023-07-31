import { request } from '../utils/request';

export default function getAccountList(props) {
  const url = '/users';

  return request
    .get(url, {
      params: {
        FullName: props.search,
        Role: props.Role,
        IsEnable: props.IsEnable,
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
