import { request } from '../utils/request';

export default function updateStore({
  id,
  province,
  city,
  district,
  address,
  description,
  storeTypeId,
  areaId,
  serviceTypeId,
  isEnable,
  userId,
}) {
  const url = '/stores';

  return request
    .put(url, {
      id: id,
      province: province,
      city: city,
      district: district,
      street: 'string',
      address: address,
      description: description,
      storeTypeId: storeTypeId,
      areaId: areaId,
      serviceTypeId: serviceTypeId,
      isEnable: isEnable,
      userId: userId,
    })
    .then((response) => response)
    .catch((err) => err);
}
