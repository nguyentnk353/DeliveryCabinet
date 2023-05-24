import axios from 'axios';

export default function createBoxSize({
  name,
  length,
  height,
  description,
  multiplyPrice,
}) {
  const url = 'https://deliver-store.tk/api/v1/boxSizes';

  return axios
    .post(url, {
      name: name,
      length: length,
      height: height,
      description: description,
      isEnable: true,
      createTime: '2023-05-24T18:54:05.978Z',
      multiplyPrice: multiplyPrice,
    })
    .then((response) => response)
    .catch((err) => err);
}
