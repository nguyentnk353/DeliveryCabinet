import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMount } from 'ahooks';
import axios from 'axios';
import useNotification from '../../../../utils/useNotification';
import { useEffect } from 'react';
function ShopSidebarDC({ clear, setClear, setProvinceDropdown, setDistrictDropdown, setWardDropdown }) {

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
  return (
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
                setProvince(provinceList.find((item) => item.code == e.target.value))
                callApiDistrict(host + 'p/' + e.target.value + '?depth=2');
                setProvinceDropdown(provinceList.find((item) => item.code == e.target.value))
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
                setDistrict(districtList.find((item) => item.code == e.target.value));
                callApiWard(host + 'd/' + e.target.value + '?depth=2');
                setDistrictDropdown(districtList.find((item) => item.code == e.target.value))
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
                setWard(wardList.find((item) => item.code == e.target.value));
                setWardDropdown(wardList.find((item) => item.code == e.target.value))
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
  );
}

export default ShopSidebarDC;