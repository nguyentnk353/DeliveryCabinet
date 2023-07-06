import { request } from '../utils/request';

export default function createBoxSize({
  name,
  length,
  height,
  description,
  multiplyPrice,
}) {
  const url = '/box-sizes';

  return request
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
