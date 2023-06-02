import { request } from '../utils/request';

export default function createLocker(data) {
  const url = '/lockers';

  const boxes = data.box.map((e, i) => {
    return {
      description: e.Description,
      boxTypeId: e.BoxType.id,
      code: e.Code,
      boxSizeId: e.BoxSize.id,
      fromLeft: e.FromLeft,
      fromTop: e.FromTop,
    };
  });
  const locker = {
    name: data.name,
    description: data.description,
    storeId: data.StoreId,
    row: data.row,
    col: data.col,
    isPattern: data.isPattern,
    boxes: boxes,
  };

  return request
    .post(url, locker)
    .then((response) => response)
    .catch((err) => err);
}
