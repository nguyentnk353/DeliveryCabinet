import axios from 'axios';

export default function createServiceType({ price, description }) {
  const url = 'https://deliver-store.tk/api/v1/serviceTypes';
  console.log(description);
  return axios
    .post(url, {
      price: price,
      description: description,
    })
    .then((response) => response)
    .catch((err) => err);
}
