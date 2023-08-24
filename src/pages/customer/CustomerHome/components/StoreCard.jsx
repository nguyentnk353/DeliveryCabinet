import React, { useState } from 'react';
import { BsGridFill, BsList } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import VendorCard03 from './VendorCard03';
import { useEffect } from 'react';
import getAllStore from './../../../../services/Customer/getAllStore';
import NotFoundItem from '../../../../assets/images/NotFoundItem.png'
const StoreCard = ({ search, pg, onPageChange, province, district, ward, setTotalStore }) => {
  const pageSize = 6;
  const [gridView, setGridView] = useState(Boolean(false));
  const location = useLocation();
  const [listStore, setListStore] = useState([]);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(0);


  useEffect(() => {
    if (search) {
      onPageChange(1);
    }
    const payload = {
      PageIndex: pg,
      PageSize: pageSize,
      search: search,
      Province: province.name,
      City: district.name,
      District: ward.name,
      isEnable: true,
    };

    getAllStore(payload)
      .then((res) => {
        const newListStore = res.items.filter((e) => {
          if(e?.id != 0 &&
            e?.isEnable == true &&
            e?.user.isEnable == true &&
            e?.storeType.isEnable == true &&
            e?.serviceType.isEnable == true &&
            e?.area.isEnable == true){
              return e
          }
      });
        setListStore(newListStore);
        setTotalStore(res?.totalRecord);
        setTotal(newListStore.length);
        setLoad(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, pg, province, district, ward]);
  return (
    <>
      <div className="border-t border-gray-300">
        <div className="w-full xl:max-w-[1170px] mx-auto">
          <div className="flex items-center justify-end mb-6 xl:mb-2 mt-2">
            <div className="flex-shrink-0 flex items-center space-x-1.5 ms-2">
              <button
                aria-label="list"
                className={`text-2xl relative top-[1px] transition-all ${gridView === false ? "text-heading" : "text-body"
                  }`}
                onClick={() => { setGridView(false) }}
              >
                <BsList className="" />
              </button>
              <button
                aria-label="grid"
                className={`text-lg transition-all ${gridView === true ? "text-heading" : "text-body"
                  }`}
                onClick={() => { setGridView(true) }}
              >
                <BsGridFill />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {load != 0 ?
              (total != 0 ? listStore.map((store, index) => {
                if (store.isEnable == true &&
                  store.user.isEnable == true &&
                  store.storeType.isEnable == true &&
                  store.serviceType.isEnable == true &&
                  store.area.isEnable == true) {
                  return (
                    <VendorCard03 key={index} store={store} variant={gridView === true ? "grid" : "list"} />
                  )
                }
                return null;
              }) : <div>
                <div className='flex justify-center'>
                  <img src={NotFoundItem} alt="No Item Found" width='80%' />
                </div>
                <div className='flex justify-center font-semibold text-blue-700'>Không tìm thấy của hàng</div>
              </div>
              ) : (

                <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>

              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreCard