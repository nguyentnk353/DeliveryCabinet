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

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [listLocker, setListLocker] = useState([]);
  const [orderBoxInfo, setOrderBoxInfo] = useState();
  const [getLockerId, setLockerId] = useState();
  const [rentBoxModalOpen, setRentBoxModalOpen] = useState(false);

  useMount(() => {
    // getAllBox(location.state?.storeInfo?.id)
    //   .then((res) => {
    //     const newListBoxApi = res.map((e) => e);
    //     setListBox(newListBoxApi);
    //     setTotalBox(res.length)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    getAllLocker(location.state?.storeInfo?.id)
      .then((res) => {
        const newListLockerApi = res.items.map((e) => e);
        setListLocker(newListLockerApi);
        // setTotalBox(res.length)
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <ShowMoreModal isOpen={showMoreModal} setIsOpen={setShowMoreModal} storeId={location.state.storeInfo.id} />
      <RentBoxModal isOpen={rentBoxModalOpen} setIsOpen={setRentBoxModalOpen} boxInfo={orderBoxInfo} lockerId={getLockerId} serviceTypeId={location.state.storeInfo.serviceTypeId} />
      <div className="border-t border-gray-300 bg-slate-100">

        {/* Mobile sidebar */}
        <MobileSidebar isOpen={showMoreModal} setIsOpen={setShowMoreModal} storeId={location.state.storeInfo.id} />

        <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
          <div className="flex flex-col lg:flex-row lg:pt-7 pb-16 lg:pb-20">
            <div className="flex flex-col pb-16 lg:flex-row lg:pb-20 lg:pt-7">

              {/* Web sidebar */}
              <WebSidebar storeId={location.state.storeInfo.id} />

              <div className="w-full lg:pl-7">
                <div className="mb-5 flex lg:mb-7">

                  {/* PriceTable */}
                  {/* <PriceTable storeId={location.state.storeInfo.id} /> */}

                </div>
                {/* <div className='flex items-start'>
                  <div className='font-bold	mb-4 w-fit lg:text-[20px] sm:text-base pr-3'>Chọn tủ muốn thuê</div>
                  <img className="pt-1" src={QRCode} alt="Your SVG" width='20px' />
                </div> */}


                {/*Product*/}
                {listLocker.map((row, index) => {
                  return (
                    <div key={index}>
                      <div className='flex font-bold my-4 w-fit lg:text-[20px] sm:text-base pr-3'>{row?.name}</div>
                      <div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 lg:gap-x-5 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-y-8">
                          <CustomerBox                      
                            isOpen={rentBoxModalOpen}
                            setIsOpen={setRentBoxModalOpen}
                            lockerId={row?.id}
                            setLockerId={setLockerId}
                            setInfoModal={setOrderBoxInfo} />
                        </div>
                      </div>
                    </div>
                  );
                })}



                <div className="pt-8 text-center xl:pt-14 hidden">
                  <button
                    data-variant="slim"
                    className="font-body bg-slate-950 hover:shadow-cart inline-flex h-11 transform-none cursor-pointer items-center justify-center rounded-md border-0 border-transparent px-5 py-2 text-center text-[13px] font-semibold normal-case leading-4 text-white placeholder-white transition duration-300 ease-in-out hover:bg-gray-600 hover:text-white focus:outline-none focus-visible:outline-none md:h-12 md:text-sm"
                  >
                    Load More
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