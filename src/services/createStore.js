import axios from 'axios';

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
  const url = 'https://deliver-store.tk/api/v1/stores';

  return axios
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
