import React, { useState } from 'react';

import Image from '../../../../assets/images/defaultAvatar.png';
import { useMount } from 'ahooks';
import getLoginUser from '../../../../services/Customer/getLoginUser';

function AccountPanel() {

  const [sync, setSync] = useState(false);
  const [info, setInfo] = useState('');
  const [imgSrc, setImgSrc] = useState(`${Image}`);

  useMount(()=>{
    getLoginUser()
      .then((res) => {
        setImgSrc(res.imgUrl)
        setInfo(res)
      })
      .catch((err) => {
        console.log(err);
      });
  })
  const handleChangName = () => {

  }
  const handleSumit = (e) => {
    console.log(e.target.value)
  }
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Hồ sơ của tôi</h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img className="w-20 h-20 rounded-full"  width="80" height="80" alt="User upload" 
                  src={imgSrc} onError = {() => setImgSrc(Image)}
              />
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Thay đổi</button>
          </div>
        </section>
        {/*Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Thông tin cá nhân</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Họ và tên</label>
              <input id="name" className="form-input w-full" type="text" defaultValue={info.fullName} onChange={()=>{handleChangName()}}/>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Ngày sinh</label>
              <input id="business-id" className="form-input w-full" type="text" defaultValue={'24-04-2001'}/>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Tài khoản</label>
              <input disabled id="location" className="form-input w-full cursor-not-allowed" type="text" defaultValue={'Customer'} />
            </div>
          </div>
        </section>
         {/*Profile */}
         <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Thông tin tài khoản</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Email</label>
              <input id="name" className="form-input w-full" type="text" defaultValue={info.email}/>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Số điện thoại</label>
              <input id="business-id" className="form-input w-full" type="text" defaultValue={info.phone}/>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Trạng thái</label>
              <input id="location" className="form-input w-full" type="text" defaultValue={'Đang hoạt động'}/>
            </div>
          </div>
        </section>
        {/* Email */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Email</h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Business email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-slate-200 hover:border-slate-300 shadow-sm text-indigo-500">Change</button>
          </div>
        </section> */}
        {/* Password */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Password</h2>
          <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
          <div className="mt-5">
            <button className="btn border-slate-200 shadow-sm text-indigo-500">Set New Password</button>
          </div>
        </section> */}
        {/* Smart Sync */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Smart Sync update for Mac</h2>
          <div className="text-sm">With this update, online-only files will no longer appear to take up hard drive space.</div>
          <div className="flex items-center mt-5">
            <div className="form-switch">
              <input type="checkbox" id="toggle" className="sr-only" checked={sync} onChange={() => setSync(!sync)} />
              <label className="bg-slate-400" htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">{sync ? 'On' : 'Off'}</div>
          </div>
        </section> */}
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Hủy</button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" type='submit' onClick={(e)=>{handleSumit(e)}}>Lưu thay đổi</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;