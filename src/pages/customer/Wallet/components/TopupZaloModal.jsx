import React, { useState } from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';
import topupZaloPay from '../../../../services/Customer/topupZaloPay';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TopupZaloModal = ({ isOpen, setIsOpen }) => {
    const re = /^[0-9\b]+$/;
    const navigate = useNavigate();
    const [getAmount, setAmount] = useState(0);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            topupmoney: '',
          },
        validationSchema: Yup.object({
            topupmoney: Yup.string()
                .matches(re, 'Số tiền là dãy các số không có khoảng cách'),
        }),
        onSubmit: (val) => {
        setIsOpen(false);
        const payload = {
            amount: val.topupmoney,
            url: 'https://delivery-cabinet.vercel.app/customer/home',
        }
        topupZaloPay(payload)
            .then((res) => {
                window.location.replace(res.order_url);
            })
            .catch((err) => {
                console.log(err);
            });
          },
    })
    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="BẢNG GIÁ THUÊ BOX">
                <form onSubmit={formik.handleSubmit}>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="text-center">
                                <div className="text-lg mb-6 font-medium">
                                    Nhập số tiền muốn nạp vào ví
                                </div>
                                {/* Submit form */}
                                <div className="flex max-w-sm m-auto">
                                    <div className="grow mr-2">
                                        <label htmlFor="subscribe-form" className="sr-only">Nhập số tiền</label>
                                        <input id="topupmoney" type="text"
                                            className={`form-input w-full px-2 py-1 ${formik.touched.topupmoney && Boolean(formik.errors.topupmoney) == true ? "border-red-500 text-red-500" : ""}`} 
                                            placeholder='đ'
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.topupmoney}
                                        />
                                        {formik.errors.topupmoney && formik.touched.topupmoney && (
                                            <p className='text-red-500 flex justify-start mt-2'>{formik.errors.topupmoney}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 mt-3">
                                    Sau khi nhấn "Xác nhận" bạn sẽ được chuyển đến giao diện nạp tiền của ZaloPay
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-5">
                        <div className="flex flex-wrap justify-between space-x-2">
                            <button className="btn-sm bg-white border-indigo-500 hover:bg-indigo-600 text-indigo-500 p-2" type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}>
                                Hủy giao dịch
                            </button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white p-2" type='submit'>
                                Xác nhận nạp
                            </button>
                        </div>
                    </div>
                </form>
            </ModalBasic>
        </>
    )
}

export default TopupZaloModal;