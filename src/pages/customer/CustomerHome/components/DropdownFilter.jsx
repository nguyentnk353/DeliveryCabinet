import React, { useState, useRef, useEffect } from 'react';
import Transition from './../../components/Transition/Transition';
import ShopSidebarDC from './ShopSidebarDC';
import axios from 'axios';
import { useMount } from 'ahooks';
import useNotification from 'antd/es/notification/useNotification';
import { useLocation } from 'react-router-dom';

function DropdownFilter({
  align, province, district, ward, setProvinceDropdown, setDistrictDropdown, setWardDropdown
}) {
  const location = useLocation();
  const [msg, sendNotification] = useNotification();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [province, setProvince] = useState({ name: '', key: 0 });
  // const [district, setDistrict] = useState({ name: '', key: 0 });
  // const [ward, setWard] = useState({ name: '', key: 0 });
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
  // useEffect(() => {
  //   if (clear) {
  //     setProvince({ name: '', key: 0 });
  //     setDistrict({ name: '', key: 0 });
  //     setWard({ name: '', key: 0 });
  //   }
  // }, [clear]);
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

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span><wbr />
        <svg className="w-4 h-7 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'} w-[300px] mr-12`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <form>
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Tìm kiếm</div>
          {/* <ul className="mb-4">
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Direct VS Indirect</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Real Time Value</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Top Channels</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Sales VS Refunds</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Last Order</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Total Spent</span>
              </label>
            </li>
          </ul> */}

          {/* <ShopSidebarDC clear={getClear} setClear={setClear} setProvinceDropdown={setProvince} setDistrictDropdown={setDistrict} setWardDropdown={setWard}/> */}
          <div>
            <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-5">
              <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-6">
                <div>
                  <div className="text-sm text-slate-800 font-semibold mb-3">Địa chỉ</div>
                  <label className="sr-only">Địa chỉ</label>
                  <select
                    className="form-select w-64 mb-3"
                    defaultValue="Chọn tỉnh/tp"
                    onChange={(e) => {
                      // setProvince(provinceList.find((item) => item.code == e.target.value));
                      setProvinceDropdown(provinceList.find((item) => item.code == e.target.value));
                      callApiDistrict(host + 'p/' + e.target.value + '?depth=2');
                    }}
                  >
                    <option hidden>Chọn tỉnh</option>
                    {provinceList.map((item) => (
                      <option key={item.code} value={item.code}>{item.name}</option>
                    ))
                    }


                  </select>
                  <select
                    className="form-select w-64 mb-3"
                    defaultValue="Chọn quận/huyện"
                    onChange={(e) => {
                      // setDistrict(districtList.find((item) => item.code == e.target.value));
                      setDistrictDropdown(districtList.find((item) => item.code == e.target.value));
                      callApiWard(host + 'd/' + e.target.value + '?depth=2');
                    }}
                  >
                    <option hidden>Chọn quận/huyện</option>
                    {districtList.map((item) => (
                      <option key={item.code} value={item.code}>{item.name}</option>
                    ))
                    }
                  </select>
                  <select
                    className="form-select w-64 mb-3"
                    defaultValue="Chọn phường/xã"
                    onChange={(e) => {
                      // setWard(wardList.find((item) => item.code == e.target.value));
                      setWardDropdown(wardList.find((item) => item.code == e.target.value));
                    }}
                  >
                    <option hidden>Chọn phường/xã</option>
                    {wardList.map((item) => (
                      <option key={item.code} value={item.code}>{item.name}</option>
                    ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button 
                  type="reset"
                  value="reset"
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={() => {
                    setDistrictList([]);
                    setWardList([]);
                    setProvinceDropdown({ name: '', key: 0 });
                    setDistrictDropdown({ name: '', key: 0 });
                    setWardDropdown({ name: '', key: 0 })
                    setDropdownOpen(false);
                  }}
                >
                  Hủy tìm kiếm
                </button>
              </li>
              <li>
                <button className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  type='button'
                  onClick={() => setDropdownOpen(false)} onBlur={() => setDropdownOpen(false)}
                >
                  Hoàn thành
                </button>
              </li>
            </ul>
          </div>
        </div>
        </form>
      </Transition>
      
    </div>
  );
}

export default DropdownFilter;
