import React, { useState } from 'react';

import Image from '../../../../assets/images/defaultAvatar.png';
import { useMount } from 'ahooks';
import getLoginUser from '../../../../services/Customer/getLoginUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import updateAccCustomer from '../../../../services/Customer/updateAccCustomer';
import postImage from '../../../../services/postImage';
import useNotification from '../../../../utils/useNotification';


function AccountPanel() {

  const [msg, sendNotification] = useNotification();
  const [sync, setSync] = useState(false);
  const [info, setInfo] = useState('');
  const [imgSrc, setImgSrc] = useState(`${Image}`);
  const [getFlie, setFile] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;


  useMount(() => {
    getLoginUser()
      .then((res) => {
        setImgSrc(res?.imgUrl)
        setInfo(res)
        setUserInfo(res)
      })
      .catch((err) => {
        console.log(err);
      });
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      imgUrl: userInfo?.imgUrl,
      fullName: userInfo?.fullName,
      email: userInfo.email,
      phone: userInfo?.phone,
      dob: userInfo?.dob,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, 'Họ và tên có tối thiểu 2 kí tự')
        .max(30, 'Họ và tên có tối đa 30 kí tự')
        .required('Tên không được trống!'),
      email: Yup.string().email('Sai định dạng email').required('Trường này không được trống!'),
      phone: Yup.string()
        .required('Số điện thoại không được trống!')
        .matches(phoneRegExp, 'Sai định dạng số điện thoại Việt Nam'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('file', getFlie);
      if (getFlie) {
        postImage(formData)
          .then((res) => {
            if (res.status === 200) {
              const api = {
                id: userInfo?.id,
                fullName: values?.fullName,
                email: values?.email,
                phone: values.phone,
                dob: values?.dob,
                isEnable: userInfo?.isEnable,
                imgUrl: res.data.url,
              };
              updateAccCustomer(api)
                .then((res) => {
                  if (res.status == 200) {
                    sendNotification({
                      msg: 'Cập nhật tài khoản thành công',
                      variant: 'success',
                    });
                  } else {
                    sendNotification({ msg: 'Cập nhật tài khoản thất bại', variant: 'error' });
                  }
                })
                .catch((err) => {
                  sendNotification({ msg: "không cập nhật được tài khoản", variant: 'error' });
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const api = {
          id: userInfo?.id,
          fullName: values?.fullName,
          email: values?.email,
          phone: values.phone,
          dob: values?.dob,
          isEnable: userInfo?.isEnable,
          imgUrl: imgSrc,
        };
        updateAccCustomer(api)
          .then((res) => {
            if (res.status == 200) {
              sendNotification({
                msg: 'Cập nhật tài khoản thành công',
                variant: 'success',
              });
            } else {
              sendNotification({ msg: 'Cập nhật tài khoản thất bại', variant: 'error' });
            }
          })
          .catch((err) => {
            sendNotification({ msg: "không cập nhật được tài khoản", variant: 'error' });
          });
      }

    },
  });

  const handleClick = () => {
    document.getElementById('img-input').click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="grow"><form onSubmit={formik.handleSubmit}>
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Hồ sơ của tôi</h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img className="w-20 h-20 rounded-full" width="80" height="80" alt="User upload"
                src={imgSrc} onError={() => setImgSrc(Image)}
              />
            </div>
            <div
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
              onClick={handleClick}

            >
              <input
                id='img-input'
                type='file'
                hidden
                accept='image/png, image/jpeg'
                // onClick={()=>console.log("click file")}
                onChange={handleImageChange}
              />
              Thay đổi
            </div>
          </div>
        </section>
        {/*Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Thông tin cá nhân</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Họ và tên</label>
              <input
                id="fullName"
                className={`form-input w-full ${formik.touched.fullName && Boolean(formik.errors.fullName) == true ? "border-red-500 text-red-500" : ""}`}
                type="text"
                defaultValue={formik.values.fullName}
                onChange={formik.handleChange}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <div className='text-red-500 text-[14px]'>{formik.errors.fullName}</div>
              )}
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Ngày sinh</label>
              <input
                id="dob"
                className="form-input w-full"
                type="date"
                value={moment(formik?.values?.dob).format('YYYY-MM-DD')}
                onChange={formik.handleChange}
              />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Số điện thoại</label>
              <input
                id="phone"
                className={`form-input w-full ${formik.touched.phone && Boolean(formik.errors.phone) == true ? "border-red-500 text-red-500" : ""}`}
                type="text"
                defaultValue={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-red-500 text-[14px]'>{formik.errors.phone}</div>
              )}
            </div>
          </div>
        </section>
        {/*Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Thông tin tài khoản</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Tên đăng nhập</label>
              <input disabled id="location" className="form-input w-full cursor-not-allowed bg-[#e6e9ed]" type="text" defaultValue={userInfo?.loginName} />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                className={`form-input w-full bg-[#e6e9ed] cursor-not-allowed ${formik.touched.email && Boolean(formik.errors.email) == true ? "border-red-500 text-red-500" : ""}`}
                type="text"
                defaultValue={formik.values.email}
                onChange={formik.handleChange}
                disabled
              />
              {formik.errors.email && formik.touched.email && (
                <div className='text-red-500 text-[14px]'>{formik.errors.email}</div>
              )}
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Trạng thái</label>
              <input disabled id="location" className="form-input w-full cursor-not-allowed bg-[#e6e9ed]" type="text" defaultValue={'Đang hoạt động'} />
            </div>
          </div>
        </section>
        {/* Email
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Email</h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Business email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-slate-200 hover:border-slate-300 shadow-sm text-indigo-500">Change</button>
          </div>
        </section>
        Password
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Password</h2>
          <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
          <div className="mt-5">
            <button className="btn border-slate-200 shadow-sm text-indigo-500">Set New Password</button>
          </div>
        </section>
        Smart Sync
        <section>
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
            <button hidden className="btn border-slate-200 hover:border-slate-300 text-slate-600" type='button'>Hủy</button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" type='submit'>Lưu thay đổi</button>
          </div>
        </div>
      </footer>
    </form>
    </div>
  );
}

export default AccountPanel;