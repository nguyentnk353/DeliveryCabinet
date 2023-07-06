import { request } from '../utils/request';

export default function updateStoreType(props) {
  const url = 'store-types';
  return request
    .put(url, {
      id: props.id,
      name: props.name,
      description: props.description,
      isEnable: props.isEnable,
    })
    .then((response) => response)
    .catch((err) => err.response);
}
