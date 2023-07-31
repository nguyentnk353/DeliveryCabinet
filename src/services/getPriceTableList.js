import { request } from '../utils/request';

export default function getPriceTableList({
  Name,
  PageIndex,
  PageSize,
  IsEnable,
}) {
  const url = '/price-tables';

  return request
    .get(url, {
      params: {
        Name: Name,
        PageIndex: PageIndex,
        PageSize: PageSize,
        IsEnable: IsEnable,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
