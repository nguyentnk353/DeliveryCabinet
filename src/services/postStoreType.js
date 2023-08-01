import { request } from '../utils/request';
export default function postStoreType(props) {
  const url = '/store-types';

  return request
    .post(url, {
      name: props.name,
      description: props.description,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}
