import { request } from '../utils/request';

export default function updateLocker({ id, name, description, isEnable }) {
  const url = '/lockers/';

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
