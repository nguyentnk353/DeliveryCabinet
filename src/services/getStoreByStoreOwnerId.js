import { request } from '../utils/request';

export default function getStoreByStoreOwnerId({
  PageIndex,
  PageSize,
  province,
  city,
  district,
  search,
  isEnable,
  UserId,
}) {
  const url = '/stores';

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
        UserId: UserId,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
