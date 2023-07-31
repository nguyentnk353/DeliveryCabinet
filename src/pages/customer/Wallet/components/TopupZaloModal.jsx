import React, { useState } from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';
import topupZaloPay from '../../../../services/Customer/topupZaloPay';
import { useNavigate } from 'react-router';

const TopupZaloModal = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const [getAmount, setAmount] = useState(0);
    const handleAmount = () => {
        const payload = {
            amount: getAmount,
            url: 'https://delivery-cabinet.vercel.app/customer/home',
        }
        // console.log(payload)
        topupZaloPay(payload)
            .then((res) => {
                window.location.replace(res.order_url); 
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="BẢNG GIÁ THUÊ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="text-center">
                                <div className="text-lg mb-6 font-medium">
                                    Nhập số tiền muốn nạp vào ví
                                </div>
                                {/* Submit form */}
                                <form className="flex max-w-sm m-auto">
                                    <div className="grow mr-2">
                                        <label htmlFor="subscribe-form" className="sr-only">Leave your Email</label>
                                        <input id="subscribe-form" className="form-input w-full px-2 py-1" type="email" placeholder='VNĐ' 
                                                onChange={(e)=>{setAmount(e.target.value)}}
                                        />
                                    </div>
                                </form>
                                <div className="text-xs text-slate-500 mt-3">
                                    Sau khi nhấn "Xác nhận" bạn sẽ được chuyển đến giao diện nạp tiền
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-5">
                        <div className="flex flex-wrap justify-between space-x-2">
                            <button className="btn-sm bg-white border-indigo-500 hover:bg-indigo-600 text-indigo-500 p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}>
                                Hủy giao dịch
                            </button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    handleAmount();
                                }}>
                                Xác nhận nạp
                            </button>
                        </div>
                    </div>
                </>
            </ModalBasic>
        </>
    )
}

export default TopupZaloModal;