import { request } from '../utils/request';
export default function postArea(props) {
  const url = '/areas';

  return request
    .post(url, {
      name: props.name,
      description: props.description,
    })
    .then((response) => response)
    .catch((err) => err);
}
