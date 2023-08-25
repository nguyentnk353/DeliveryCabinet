import { useMount } from 'ahooks';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getOrderById from '../../../services/Customer/getOrderById';
import getStoreById from './../../../services/Customer/getStoreById';
import getOpenCode from '../../../services/Customer/getOpenCode';
import StepOrder from './components/StepOrder';
import PriceTableModal from './components/PriceTableModal';
import GetOpenCodeModal from './components/GetOpenCodeModal';
import { Paper } from '@mui/material';
import moment from 'moment';
import { blue, yellow } from '@mui/material/colors';
import ConfirmFinishRentModal from './components/ConfirmFinishRentModal';
import getCurrentPrice from './../../../services/Customer/getCurrentPrice';
import getLockerById from '../../../services/Customer/getLockerById';
import { UnitSizeBox } from '../../../constant/boxConstant';
import ConfirmOpenBox from './components/ConfirmOpenBox';

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState();
  const [openCode, SetOpenCode] = useState('');
  const [currentPrice, setCurrentPrice] = useState();
  const [statusName, setStatusName] = useState('');
  const [load, setLoad] = useState(0);
  const [loadFinish, setLoadFinish] = useState(false);
  const [locker, setLocker] = useState([]);
  const [isOpenPriceTable, setIsOpenPriceTable] = useState(false);
  const [isOpenOpenCode, setIsOpenOpenCode] = useState(false);
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [isFinishOrder, setIsFinishOrder] = useState(false);

  const orderId = location.state?.orderInfo?.id;
  const order = location.state?.orderInfo;
  const store = location.state?.storeInfo;
  const createTime = moment(location.state?.orderInfo?.createTime).format(
    'H:mm DD-MM-YYYY'
  );
  const endTime = moment(location.state?.orderInfo?.endTime).format(
    'H:mm DD-MM-YYYY'
  );
  const lockerId = location.state?.orderInfo?.box?.lockerId;
  //location.state?.orderInfo
  // console.log(locker);
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
        };
        changeString();
        setOrderInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // getStoreById(store?.id)
    //   .then((res) => {
    //     setStoreInfo(res);
    //     // console.log(storeInfo)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getLockerById(lockerId)
      .then((res) => {
        setLocker(res.items[0]);

      })
      .catch((err) => {
        console.log(err);
      });

    getCurrentPrice(order?.id)
      .then((res) => {
        setCurrentPrice(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoad(1);
  });

  // console.log(location.state?.orderInfo)
  const handleOpenCode = () => {
    if (order?.status != 3) {
      getOpenCode(orderId)
        .then((res) => {
          SetOpenCode(res.openCode);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      SetOpenCode('0000');
    }
  };

  return (
    <div className='bg-[#f1f5f9] md:px-[7%] md:py-[3%] min-h-[75vh]'>
      <PriceTableModal
        isOpen={isOpenPriceTable}
        setIsOpen={setIsOpenPriceTable}
        storeId={store?.id}
        priceTableId={order?.priceTableId}
        length={order?.box?.boxSize?.length}
        height={order?.box?.boxSize?.height}
        boxType={order?.box?.boxType?.name}
      />
      <GetOpenCodeModal
        isOpen={isOpenOpenCode}
        setIsOpen={setIsOpenOpenCode}
        openCode={openCode}
        orderStatus={order?.status}
      />
      <ConfirmOpenBox
        isOpen={isOpenBox}
        setIsOpen={setIsOpenBox}
        boxId={order?.box?.id}
      />
      <ConfirmFinishRentModal
        isOpen={isFinishOrder}
        setIsOpen={setIsFinishOrder}
        orderId={orderInfo?.id}
        setLoadFinish={setLoadFinish}
      />
      {load != 0 ?
        (
          <div>

            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-2xl  font-semibold text-black dark:text-white'>
                  Chi tiết đơn hàng #{orderInfo?.id}
                </h2>
                <nav>
                  <ol className='flex items-center gap-2'>
                    <li>
                      <a className='font-medium' href='/customer'>
                        Trang chủ /
                      </a>
                    </li>
                    <li className='text-[#3c50e0] font-medium'>Đơn hàng</li>
                  </ol>
                </nav>
              </div>
              <div className='bg-white py-5 mb-5'>
                <StepOrder createTime={createTime} endTime={endTime} />
              </div>
              <div className='border-stroke shadow-default dark:border-strokedark dark:bg-boxdark md:bg-white md:border rounded-sm md:p-6 xl:p-9'>
                <div className='flex flex-col-reverse gap-5 xl:flex-row xl:justify-between'>
                  <div className='md:flex md: gap-10'>
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
                        <p className='mb-1.5 text-lg font-medium text-[#2196f3] dark:text-white md:text-2xl'>
                          Thông tin cửa hàng
                        </p>

                        <h4 className='mb-4 text-base font-medium text-black dark:text-white'>
                          {store?.name}
                        </h4>
                        <div className='block'>
                          <span className='font-semibold'>Liên hệ:</span>{' '}
                          {locker?.store?.user?.phone}
                        </div>
                        <span className='mt-2 block'>
                          <span className='font-semibold'>Địa chỉ:</span>{' '}
                          {store?.address}
                          {/* Davis Anenue */}
                        </span>
                      </div>
                    </div>

                    <div className='md:flex md:justify-end'>
                      <div className='max-md:border bg-white max-md:p-4'>
                        <h4 className='mb-1 md:mt-3 text-lg font-medium text-[#2196f3] dark:text-white md:text-2xl'>
                          Thông tin tủ
                        </h4>
                        <div className='mb-4 text-base font-medium text-black dark:text-white'>
                          {' '}
                          {locker?.name}
                        </div>
                        <div className='block'>
                          <span className='font-semibold'>Tên box:</span>{' '}
                          {order?.box?.code}
                        </div>
                        <div className='md:flex md:gap-10'>
                          <span className='mt-2 block'>
                            <span className='font-semibold'>Kích thước:</span>{' '}
                            {order?.box?.boxSize?.length * UnitSizeBox} cm x{' '}
                            {order?.box?.boxSize?.height * UnitSizeBox} cm
                          </span>
                          <span className='mt-2 block'>
                            <span className='font-semibold'>Phân loại:</span>{' '}
                            {order?.box?.boxType?.name}
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

                <div className='-mx-4 md:mx-4 flex flex-wrap'>
                  <div className='max-md:border bg-white p-4 w-full max-md:m-4 flex justify-center'>
                    {/* <p className='font-semibold text-[#14df14] text-2xl'>
                Locker here
              </p> */}
                    <br />
                    <div
                      id='grid'
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${locker?.col}, 1fr)`,
                        gridTemplateRows: `repeat(${locker?.row}, 1fr)`,
                        gridGap: '8px',
                        width: '80%'
                      }}
                    >
                      {locker?.boxes &&
                        locker.boxes?.map((e, i) => {
                          if (e?.id == order?.box?.id) {
                            return (
                              <Paper
                                className='grid-item'
                                key={i}
                                sx={{
                                  gridRow: `span ${e.boxSize?.height}`,
                                  gridColumn: `span ${e.boxSize?.length}`,
                                  cursor: 'pointer',
                                  backgroundColor: blue[100],
                                  textAlign: 'center',
                                  paddingBottom: '40%',
                                  paddingTop: '10%',
                                  border: '3px solid'
                                }}
                              >
                                {e.code}
                                <br />
                                Tủ của bạn
                              </Paper>
                            );
                          } else {
                            return (
                              <Paper
                                className='grid-item'
                                key={i}
                                sx={{
                                  gridRow: `span ${e.boxSize?.height}`,
                                  gridColumn: `span ${e.boxSize?.length}`,
                                  cursor: 'pointer',
                                  backgroundColor: yellow[100],
                                  textAlign: 'center',
                                  paddingBottom: '40%',
                                  paddingTop: '10%',
                                  border: '3px solid'
                                }}
                              >
                                {e.code}
                              </Paper>
                            );
                          }
                        })}
                    </div>
                  </div>

                  <div className='w-full max-md:p-4 md:mt-7 bg-white max-md:border max-md:m-4'>
                    <div>
                      <div className='max-md:grid grid-cols-2'>
                        <h4 className='mb-4 text-xl font-medium text-[#2196f3] dark:text-white md:text-2xl'>
                          Phương thức
                        </h4>
                        <div
                          className='max-md:flex justify-end text-[#14df14] cursor-pointer'
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpenPriceTable(true);
                          }}
                        >
                          Xem giá thuê
                        </div>
                      </div>
                      <p>
                        DC Pay
                        <br />
                        {orderInfo?.user?.fullName}
                      </p>
                    </div>
                  </div>
                  <div role="status" className={`w-full flex justify-center absolute z-1 md:hidden ${loadFinish == false && "hidden"}`}>
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <div className='w-full max-md:px-4'>
                    <div className='md:ml-auto'>
                      <div className='md:ml-auto md:w-1/2 bg-white max-md:border max-md:p-4'>
                        <div className='max-md:grid grid-cols-2'>
                          <h4 className='mb-4 text-xl font-medium text-[#2196f3] dark:text-white md:text-2xl'>
                            Thanh toán
                          </h4>
                          {(order?.status == 4 || order?.status == 3) &&
                            <div className='max-md:flex justify-end text-right text-red-500 cursor-pointer'>Phí quá hạn: 10% </div>
                          }
                        </div>
                        {/* <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Subtotal </span>
                    <span> $120.00 </span>
                  </p>
                  <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Shipping Cost (+) </span>
                    <span> $10.00 </span>
                  </p> */}
                        {(order?.status == 2 || order?.status == 4) &&
                          <p className='border-stroke dark:border-strokedark mb-4 mt-2 flex justify-between border-t pt-6 font-medium text-black dark:text-white'>
                            <span> Đã thanh toán: </span>
                            <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order?.total)} </span>
                          </p>
                        }

                        {(order?.status != 2 && order?.status != 4) &&
                          <p className='border-stroke dark:border-strokedark mb-4 flex justify-between font-medium text-black dark:text-white'>
                            <span> Tổng tiền thuê hiện tại: </span>
                            <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentPrice)} </span>
                          </p>
                        }

                      </div>
                      {(order?.status == 1 || order?.status == 3) ? (
                        <div className='md:flex md:justify-end'>
                          <div className='max-md:grid max-md:grid-cols-2 my-5 flex flex-col justify-end gap-4 sm:flex-row'>
                            <button
                              className='border-[#3c50e0] text-[#3c50e0] flex items-center justify-center rounded border px-8 py-2.5 text-center font-medium hover:bg-opacity-90'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCode();
                                setIsOpenOpenCode(true);
                              }}
                            >
                              Lấy mã
                            </button>
                            <button
                              className='border-[#3c50e0] text-[#3c50e0] flex items-center justify-center border rounded px-8 py-2.5 text-center font-medium hover:bg-opacity-90'
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsOpenBox(true);
                              }}
                            >
                              Mở tủ
                            </button>
                          </div>
                          <button
                            className='bg-[#3c50e0] md:ml-4 text-white my-5 max-md:w-full flex items-center justify-center rounded px-8 py-2.5 text-center font-medium hover:bg-opacity-90'
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFinishOrder(true);
                            }}
                          >
                            Thanh toán và lấy hàng
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div role="status" className='bg-slate-100 flex justify-center py-[50%]'>
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )
      }
    </div>
  );
};

export default OrderDetail;
