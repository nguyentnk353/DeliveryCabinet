import { request } from '../utils/request';

export default function getServiceTypeList({
  Id,
  PageIndex,
  PageSize,
  IsEnable,
}) {
  const url = '/serviceTypes/serviceType-paging';

  return request
    .get(url, {
      params: {
        Id: Id,
        PageIndex: PageIndex,
        PageSize: PageSize,
        IsEnable: IsEnable,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
