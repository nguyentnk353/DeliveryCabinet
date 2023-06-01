import { request } from '../utils/request';

export default function createStore({
  province,
  city,
  district,
  address,
  description,
  storeTypeId,
  areaId,
  serviceTypeId,
  userId,
}) {
  const url = '/stores';

  return request
    .post(url, {
      province: province.codename,
      city: city.codename,
      district: district.codename,
      street: 'string',
      address: address,
      description: description,
      storeTypeId: storeTypeId,
      areaId: areaId,
      serviceTypeId: serviceTypeId,
      userId: userId,
    })
    .then((response) => response)
    .catch((err) => err);
}
