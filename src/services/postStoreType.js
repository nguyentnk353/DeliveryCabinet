import axios from 'axios';
export default function postStoreType(props) {
  const url = 'https://deliver-store.tk/api/v1/storeTypes';
  console.log(props);
  return axios
    .post(url, {
        name: props.name,
        description: props.description
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}