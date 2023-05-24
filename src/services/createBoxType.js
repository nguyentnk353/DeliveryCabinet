import axios from 'axios';

export default function createBoxType({ name, multiplyPrice }) {
  const url = 'https://deliver-store.tk/api/v1/boxTypes';

  return axios
    .post(url, {
      name: name,
      multiplyPrice: multiplyPrice,
    })
    .then((response) => response)
    .catch((err) => err);
}
