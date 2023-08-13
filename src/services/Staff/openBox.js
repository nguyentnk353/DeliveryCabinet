import { requestStaff } from '../../utils/requestStaff';

export default function openBox(id) {
  const url = `/boxs/${id}/open-box`;

  return requestStaff
    .put(url)
    .then((response) => response)
    .catch((err) => err);
}
