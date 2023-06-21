import { request } from '../utils/request';

export default function updateArea(props) {
  const url = 'areas';
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
