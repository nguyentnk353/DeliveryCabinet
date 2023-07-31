import { useMount } from 'ahooks';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getOrderById from '../../../services/Customer/getOrderById';
import getStoreById from './../../../services/Customer/getStoreById';
import completeOrder from './../../../services/Customer/completeOrder';
import getOpenCode from '../../../services/Customer/getOpenCode';
import StepOrder from './components/StepOrder';
import PriceTableModal from './components/PriceTableModal';
import GetOpenCodeModal from './components/GetOpenCodeModal';
import moment from 'moment';


const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState();
  const [storeInfo, setStoreInfo] = useState();
  const [openCode, SetOpenCode] = useState('xxxx');
  const [statusName, setStatusName] = useState('');
  const [isOpenPriceTable, setIsOpenPriceTable] = useState(false);
  const [isOpenOpenCode, setIsOpenOpenCode] = useState(false);

  const orderId = location.state?.orderInfo?.id;
  const order = location.state?.orderInfo;
  const createTime = moment(location.state?.orderInfo?.createTime).format('H:mm DD-MM-YYYY');
  const endTime = moment(location.state?.orderInfo?.endTime).format('H:mm DD-MM-YYYY');

  // console.log(order)
  useMount(() => {
    getOrderById(orderId)
      .then((res) => {
        const changeString = () => {
          switch (res.status) {
            case 0:
              setStatusName('Đã hủy');
              return;
            case 1:
              setStatusName('Đang thuê');
              return;
            case 2:
              setStatusName('Hoàn thành');
              return;
            case 3:
              setStatusName('Quá hạn');
              return;
          }
        }
        changeString();
        setOrderInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // getStoreById(order?.box?.locker?.store?.id)
    //   .then((res) => {
    //     setStoreInfo(res);
    //     // console.log(storeInfo)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  })

  // console.log(location.state?.orderInfo)
  const handleOpenCode = () => {
    getOpenCode(orderId)
      .then((res) => {
        SetOpenCode(res.openCode);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const handleCompleteOrder = () => {
    completeOrder(orderInfo?.id);
    navigate('/customer');

  }

  return (
    <div className='bg-[#f1f5f9] md:px-[7%] md:py-[3%]'>
      <PriceTableModal isOpen={isOpenPriceTable} setIsOpen={setIsOpenPriceTable} storeId={order?.box?.locker?.store?.id} />
      <GetOpenCodeModal isOpen={isOpenOpenCode} setIsOpen={setIsOpenOpenCode} openCode={openCode} />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl  font-semibold text-black dark:text-white">
            Chi tiết đơn hàng #{orderInfo?.id}
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <a className="font-medium" href="/customer">
                  Trang chủ /
                </a>
              </li>
              <li className="text-[#3c50e0] font-medium">Đơn hàng</li>
            </ol>
          </nav>
        </div>
        <div className='bg-white py-5 mb-5'>
          <StepOrder createTime={createTime} endTime={endTime}/>
        </div>
        <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark md:bg-white md:border rounded-sm md:p-6 xl:p-9">
          <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
            <div className="md:flex md: gap-10">
              {/* <div>
                <p className="mb-1.5 text-lg font-medium text-black dark:text-white">
                  Customer
                </p>
                <h4 className="mb-4 text-2xl font-semibold text-black dark:text-white">
                  {orderInfo?.user?.fullName}
                </h4>
                <a href="#" className="block">
                  <span className="font-medium">Phone:</span> {orderInfo?.user?.phone}
                </a>
                <span className="mt-2 block">
                  <span className="font-medium">Email:</span> {orderInfo?.user?.email}
                </span>
              </div> */}
              <div className='max-md:border bg-white p-4 max-md:mb-5 md:flex md:justify-start'>
                <div>
                  <p className="mb-1.5 text-lg font-medium text-[#2196f3] dark:text-white md:text-2xl">
                    Thông tin cửa hàng
                  </p>

                  <h4 className="mb-4 text-base font-medium text-black dark:text-white">
                    {order?.box?.locker?.store?.name}
                  </h4>
                  <div className="block">
                    <span className="font-semibold">Liên hệ:</span> {order?.user?.phone}
                  </div>
                  <span className="mt-2 block">
                    <span className="font-semibold">Địa chỉ:</span> {order?.box?.locker?.store?.address}
                    {/* Davis Anenue */}
                  </span>
                </div>
              </div>

              <div className="md:flex md:justify-end">
                <div className='max-md:border bg-white max-md:p-4'>
                  <h4 className="mb-1 md:mt-3 text-lg font-medium text-[#2196f3] dark:text-white md:text-2xl">
                    Thông tin tủ
                  </h4>
                  <div className='mb-4 text-base font-medium text-black dark:text-white'> {order?.box?.locker?.name}</div>
                  <div className="block">
                    <span className="font-semibold">Tên box:</span> {order?.box?.code}
                  </div>
                  <div className='md:flex md:gap-10'>
                    <span className="mt-2 block">
                      <span className="font-semibold">Kích thước:</span> {order?.box?.boxSize?.length} x {order?.box?.boxSize?.height}
                    </span>
                    <span className="mt-2 block">
                      <span className="font-semibold">Phân loại:</span> {order?.box?.boxType?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-stroke dark:border-strokedark my-10 rounded-sm border p-5">
            <div className="items-center sm:flex">
              <div className="mb-3 mr-6 h-20 w-20 sm:mb-0">
                <img
                  src={storeInfo?.imgUrl}
                  alt="product"
                  className="h-full w-full rounded-sm object-cover object-center"
                />
              </div>
              <div className="w-full items-center justify-between md:flex">
                <div className="mb-3 md:mb-0">
                  <a
                    href="#"
                    className="hover:text-primary inline-block font-semibold text-black dark:text-white"
                  >
                    {orderInfo?.box?.code}
                  </a>
                  <p className="flex text-sm font-medium">
                    <span className="mr-5"> From left   - top :  {orderInfo?.box?.fromLeft} -  {orderInfo?.box?.fromTop}</span>
                    <span className="mr-5"> Status: {orderInfo?.box?.isOpen ? 'open' : 'close'} </span>
                  </p>
                </div>
                <div className="flex items-center md:justify-end">
                  <p className="mr-20 font-semibold text-black dark:text-white">
                    Size: {orderInfo?.box?.boxSize?.length} x {orderInfo?.box?.boxSize?.height}
                  </p>
                  <p className="mr-5 font-semibold text-black dark:text-white">
                    Type: {orderInfo?.box?.boxType?.name}
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="-mx-4 md:mx-4 flex flex-wrap">
            <div className='max-md:border bg-white p-4 w-full max-md:m-4'>
              <p className='font-semibold text-[#14df14] text-2xl'>Locker here</p><br />
            </div>

            <div className="w-full max-md:p-4 md:mt-7 bg-white max-md:border max-md:m-4">

              <div>
                <div className='max-md:grid grid-cols-2'>
                  <h4 className="mb-4 text-xl font-medium text-[#2196f3] dark:text-white md:text-2xl">
                    Phương thức
                  </h4>
                  <div className='max-md:flex justify-end text-[#14df14] cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpenPriceTable(true);
                    }}
                  >
                    Xem giá thuê</div>
                </div>
                <p>
                  DC Pay Wallet<br />
                  {orderInfo?.user?.fullName}
                </p>
              </div>
            </div>

            <div className="w-full max-md:px-4">
              <div className="md:ml-auto">
                <div className="md:ml-auto md:w-1/2 bg-white max-md:border max-md:p-4">
                  <div className='max-md:grid grid-cols-2'>
                    <h4 className="mb-4 text-xl font-medium text-[#2196f3] dark:text-white md:text-2xl">
                      Thanh toán
                    </h4>
                    {/* <div className='max-md:flex justify-end text-right text-[#14df14] cursor-pointer'>Xem chi tiết</div> */}
                  </div>
                  {/* <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Subtotal </span>
                    <span> $120.00 </span>
                  </p>
                  <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Shipping Cost (+) </span>
                    <span> $10.00 </span>
                  </p> */}
                  <p className="border-stroke dark:border-strokedark mb-4 mt-2 flex justify-between border-t pt-6 font-medium text-black dark:text-white">
                    <span> Tổng tiền: </span>
                    <span> {order?.total} VNĐ</span>
                  </p>
                </div>
                {order?.status == 1 ?
                  (<div className="max-md:grid max-md:grid-cols-2 mt-10 flex flex-col justify-end gap-4 sm:flex-row">
                    <button className="border-[#3c50e0] text-[#3c50e0] flex items-center justify-center rounded border px-8 py-2.5 text-center font-medium hover:bg-opacity-90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCode();
                        setIsOpenOpenCode(true)
                      }
                      }
                    >
                      Lấy mã
                    </button>
                    <button className="bg-[#3c50e0] text-white flex items-center justify-center rounded px-8 py-2.5 text-center font-medium hover:bg-opacity-90"
                      onClick={() => { handleCompleteOrder() }}
                    >
                      Ngừng thuê
                    </button>
                  </div>) : (
                    <></>)
                }

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderDetail