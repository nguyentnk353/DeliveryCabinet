import { request } from '../utils/request';
export default function postArea(props) {
  const url = '/v1/areas';

  return request
    .post(url, {
      name: props.name,
      description: props.description,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}
