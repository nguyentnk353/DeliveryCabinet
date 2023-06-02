import { request } from '../utils/request';

export default function getLockerList({
  PageIndex,
  PageSize,
  search,
  isEnable,
}) {
  const url = '/lockers/locker-paging';

  return request
    .get(url, {
      params: {
        Name: search,
        IsEnable: isEnable,
        PageIndex: PageIndex + 1,
        PageSize: PageSize,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
