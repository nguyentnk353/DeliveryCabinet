import { useMount } from 'ahooks';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import getAllBBox from '../../../services/Customer/getAllBox';
import CustomerBox from './components/CustomerBox';
import MobileSidebar from './components/MobileSidebar';
import PriceTable from './components/PriceTable';
import RentBoxModal from './components/RentBoxModal';
import ShowMoreModal from './components/ShowMoreModal';
import WebSidebar from './components/WebSidebar';
import QRCode from '../../../assets/images/QRCode.svg';
import HistoryIcon from '@mui/icons-material/History';
import getAllBox from '../../../services/Customer/getAllBox';
import getAllLocker from '../../../services/Customer/getAllLocker';



const StoreInformation = () => {
  const location = useLocation();
  const [storeInfo, setStoreInfo] = useState();
  const [load, setLoad] = useState(0);
  const [total, setTotal] = useState(0);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [orderBoxInfo, setOrderBoxInfo] = useState();
  const [rentBoxModalOpen, setRentBoxModalOpen] = useState(false);
  const [listBox, setListBox] = useState([]);

  useMount(() => {
    getAllBox(location.state?.storeInfo?.id)
      .then((res) => {
        const newListBoxApi = res.map((e) => e);
        setListBox(newListBoxApi);
        setTotal(res.totalRecords)
        setLoad(1);
      })
      .catch((err) => {
        console.log(err);
      });

    // getAllLocker(location.state?.storeInfo?.id)
    //   .then((res) => {
    //     const newListLockerApi = res.items.map((e) => e);
    //     setListLocker(newListLockerApi);
    //     // setTotalBox(res.length)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });
  return (
    <>
      <ShowMoreModal isOpen={showMoreModal} setIsOpen={setShowMoreModal} storeId={location.state.storeInfo.id} />
      <RentBoxModal isOpen={rentBoxModalOpen} setIsOpen={setRentBoxModalOpen} boxInfo={orderBoxInfo} storeInfo={location.state?.storeInfo} serviceTypeId={location.state.storeInfo.serviceTypeId} />
      <div className="border-t border-gray-300 bg-slate-100 min-h-[60vh]">

        {/* Mobile sidebar */}
        <MobileSidebar isOpen={showMoreModal} setIsOpen={setShowMoreModal} storeId={location.state.storeInfo.id} />

        <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
          <div className="flex flex-col lg:flex-row lg:pt-7 pb-16 lg:pb-20">
            <div className="flex flex-col pb-16 lg:flex-row lg:pb-20 lg:pt-7">

              {/* Web sidebar */}
              <WebSidebar storeId={location.state.storeInfo.id} />

              <div className="w-full lg:pl-7">
                <div className="max-md:mb-5 flex ">

                  {/* PriceTable */}
                  {/* <PriceTable storeId={location.state.storeInfo.id} /> */}

                </div>
                <div className='flex items-start'>
                  <div className='font-bold	mb-4 w-fit lg:text-[20px] sm:text-base pr-3'>Chọn tủ muốn thuê</div>
                  <img hidden className="pt-1" src={QRCode} alt="Your SVG" width='20px' />
                </div>


                {/*Product*/}
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 lg:gap-x-5 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-y-8">
                  {load != 0 ?
                    (total != 0 ? listBox.map((row, index) => {
                      if (row.boxSize.isEnable == true && row.boxType.isEnable == true && row.count != 0) {
                        return (
                          <div key={index}>
                            <CustomerBox
                              isOpen={rentBoxModalOpen}
                              setIsOpen={setRentBoxModalOpen}
                              setInfoModal={setOrderBoxInfo}
                              box={row}
                            />
                          </div>
                        )
                      }
                      return null;
                    }) : <div>
                      <div className='flex justify-center'>
                        <img src={NotFoundItem} alt="No Item Found" width='80%' />
                      </div>
                      <div className='flex justify-center font-semibold text-blue-700'>Cửa hàng hiện đã hết box trống</div>
                    </div>
                    ) : (
                      <div role="status" className='w-[200%] flex justify-center mt-10'>
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    )
                  }
                </div>

                <div className="pt-8 text-center xl:pt-14 hidden">
                  <button
                    data-variant="slim"
                    className="font-body bg-slate-950 hover:shadow-cart inline-flex h-11 transform-none cursor-pointer items-center justify-center rounded-md border-0 border-transparent px-5 py-2 text-center text-[13px] font-semibold normal-case leading-4 text-white placeholder-white transition duration-300 ease-in-out hover:bg-gray-600 hover:text-white focus:outline-none focus-visible:outline-none md:h-12 md:text-sm"
                  >
                    Tải thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default StoreInformation