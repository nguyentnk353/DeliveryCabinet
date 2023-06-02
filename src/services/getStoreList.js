import { request } from '../utils/request';

export default function getStoreList({
  PageIndex,
  PageSize,
  province,
  city,
  district,
  search,
  isEnable,
}) {
  const url = '/stores/store-paging';

  return request
    .get(url, {
      params: {
        Province: province,
        City: city,
        District: district,
        Address: search,
        IsEnable: isEnable,
        PageIndex: PageIndex + 1,
        PageSize: PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
