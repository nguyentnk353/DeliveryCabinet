import { request } from '../utils/request';

export default function getLockerList({
  PageIndex,
  PageSize,
  search,
  isEnable,
  StoreId,
}) {
  const url = '/lockers/locker-paging';

  return request
    .get(url, {
      params: {
        Name: search,
        IsEnable: isEnable,
        StoreId: StoreId,
        PageIndex: PageIndex + 1,
        PageSize: PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
