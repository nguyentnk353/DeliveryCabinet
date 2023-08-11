import { requestStaff } from '../../utils/requestStaff';

export default function closeBox(id) {
  const url = `/boxs/${id}/close-box`;

  return requestStaff
    .put(url)
    .then((response) => response)
    .catch((err) => err);
}
