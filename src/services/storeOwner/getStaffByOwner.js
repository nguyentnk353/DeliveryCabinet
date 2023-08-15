import { requestOwner } from '../../utils/requestOwner';

export default function getStaffByOwner(payload) {
  const url = '/v1/users';

  return requestOwner
    .get(url, {
      params: payload,
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
