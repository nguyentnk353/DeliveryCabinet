import axios from 'axios';
export default function postArea(props) {
  const url = 'https://deliver-store.tk/api/v1/areas';
  console.log(props);
  return axios
    .post(url, {
        name: props.name,
        description: props.description
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}