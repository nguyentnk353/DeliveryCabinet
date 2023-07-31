import { request } from '../utils/request';

export default function getBoxSizeList({
  Name,
  PageIndex,
  PageSize,
  IsEnable,
}) {
  const url = '/box-sizes';

  return request
    .get(url, {
      params: {
        Name: Name,
        IsEnable: IsEnable,
        PageIndex: PageIndex,
        PageSize: PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
