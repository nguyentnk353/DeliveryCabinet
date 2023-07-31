import { useTheme } from '@mui/material';
import { useMount } from 'ahooks';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from './../../../utils/useNotification';
import PaginationClassic from './components/PaginationClassic';
import ShopSidebarDC from './components/ShopSidebarDC';
import StoreCard from './components/StoreCard';
import DropdownFilter from './components/DropdownFilter';

const CustomerHome = () => {

  const [gridView, setGridView] = useState(Boolean(false));
  const data = {}
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [msg, sendNotification] = useNotification();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pg, setPg] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [province, setProvince] = useState({ name: '', key: 0 });
  const [district, setDistrict] = useState({ name: '', key: 0 });
  const [ward, setWard] = useState({ name: '', key: 0 });
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const host = 'https://provinces.open-api.vn/api/';

  useMount(() => {
    if (location?.state?.notifyState?.msg) {
      sendNotification(location?.state?.notifyState);
    }
    return axios.get(host).then((res) => {
      setProvinceList(res.data);
    });
  });
  function callApiDistrict(api) {
    return axios.get(api).then((res) => {
      setDistrictList(res.data.districts);
    });
  }
  function callApiWard(api) {
    return axios.get(api).then((res) => {
      setWardList(res.data.wards);
    });
  }
  return (
    <>
      <div className="flex overflow-hidden bg-slate-100">

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          <main>
            <div className="px-4 sm:px-6 lg:px-8 md:py-8 w-full max-w-9xl mx-auto">

              {/* Page header */}
              <div className="md:mb-5">

                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold max-md:hidden">Find the suitable store for you ✨</h1>
              
              </div>

              {/* Page content */}
              <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 md:mt-9">

                {/* Sidebar */}
                <div className="max-w-xs pl-4 max-md:hidden">
                  <ShopSidebarDC />
                </div>

                <div className='w-full'>
                  {/* <div className="text-sm text-slate-500 italic mb-4">67.975 Items</div> */}
                  {/* Search form */}
                  <div className='grid max-md:grid-cols-7 max-md:gap-2'>
                    <div className="mb-5 max-md:col-span-6">
                      <form className="relative">
                        <label htmlFor="app-search" className="sr-only">Search</label>
                        <input id="app-search" className="form-input w-full pl-9 pr-3 py-3 focus:border-slate-300" type="search" placeholder="Nhập tên cửa hàng hoặc địa chỉ" onChange={(e) => setSearchText(e.target.value)} />
                        <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                          <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                          </svg>
                        </button>
                      </form>
                    </div>
                    <div className='md:hidden'>
                      <DropdownFilter align={'right'} setProvince={setProvince} setDistrict={setDistrict} setWard={setWard}/>
                    </div>
                  </div>
                  <StoreCard search={searchText} pg={pg} onPageChange={setPg} province={province} district={district} ward={ward}/>
                  {/* Pagination */}
                  <div className="mt-6">
                    <PaginationClassic currentPage={pg} onPageChange={setPg} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

      </div>
    </>

  )
};

export default CustomerHome;
