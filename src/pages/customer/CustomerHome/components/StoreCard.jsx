import React, { useState } from 'react';
import { BsGridFill, BsList } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import VendorCard03 from './VendorCard03';
import { useEffect } from 'react';
import getAllStore from './../../../../services/Customer/getAllStore';
const StoreCard = ({ search, pg, onPageChange, province, district, ward }) => {
  const pageSize = 6;
  const [gridView, setGridView] = useState(Boolean(false));
  const location = useLocation();
  const [listStore, setListStore] = useState([]);

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
        const newListStore = res.items.map((e) => e);
        setListStore(newListStore);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, pg, province, district, ward]);
  // console.log(province)
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
            {
              listStore.map((store, index) => {
                if (store.isEnable == true &&
                    // store.user.isEnable == true &&
                    // store.storeType.isEnable == true &&
                    store.serviceType.isEnable == true &&
                    store.area.isEnable == true) {
                  return (
                    <VendorCard03 key={index} store={store} variant={gridView === true ? "grid" : "list"} />
                  )
                }
                return null;
              })  
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreCard