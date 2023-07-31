import { request } from '../utils/request';

export default function updateBoxType({ id, name, isEnable }) {
  const url = '/box-types/';

  return request
    .put(url, {
      id: id,
      name: name,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
