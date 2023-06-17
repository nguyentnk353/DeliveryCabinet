import { request } from '../utils/request';

export default function getPriceTableItemList({
  search,
  PageIndex,
  PageSize,
  IsEnable,
  PriceTableId,
}) {
  const url = '/priceTableItems/priceTableItem-paging';

  return request
    .get(url, {
      params: {
        Id: search,
        PageIndex: PageIndex,
        PageSize: PageSize,
        IsEnable: IsEnable,
        PriceTableId: PriceTableId,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}
