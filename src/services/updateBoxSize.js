import { request } from '../utils/request';

export default function updateBoxSize({ id, name, description, isEnable }) {
  const url = '/box-sizes/';

  return request
    .put(url, {
      id: id,
      name: name,
      description: description,
      isEnable: isEnable,
    })
    .then((response) => response)
    .catch((err) => err);
}
