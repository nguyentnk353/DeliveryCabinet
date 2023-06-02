import { request } from '../utils/request';

export default function getServiceTypeList(props) {
  const url = '/serviceTypes/serviceType-paging';

  return request
    .get(url, {
      params: {
        PageIndex: '1',
        PageSize: '10',
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
