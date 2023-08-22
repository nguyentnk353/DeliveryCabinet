import React from 'react'
import { useNavigate } from 'react-router-dom';
import ModalBasic from './../../components/ModalBasic/ModalBasic';
import completeOrder from '../../../../services/Customer/completeOrder';
import useNotification from '../../../../utils/useNotification';

const ConfirmFinishRentModal = ({isOpen, setIsOpen, orderId}) => {
    const navigate = useNavigate();
    const [msg, sendNotification] = useNotification();

    const handleFinishOrder = () => {
        completeOrder(orderId)
            .then(async(res) => {
                if (res.status == 200) {
                    sendNotification({
                      msg: 'Thanh toán đơn hàng thành công',
                      variant: 'success',
                    });
                    await new Promise((resolve)=>setTimeout(resolve, 3000))
                    navigate('/customer'); 
                  } else {
                    sendNotification({ msg: 'Số dư tài khoản không đủ', variant: 'error' });
                  }
            })
            .catch((err) => {
                sendNotification({ msg: "không hoàn thành được đơn hàng", variant: 'error' });
        });
    }
    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="XÁC NHẬN LẤY HÀNG">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="hidden font-medium text-slate-800 mb-2">
                                Sau khi nhấn xác nhận, bạn có <span className='text-red-500'>10</span> giây để lấy hàng trước khi tủ tự đóng.
                            </div>
                            <div className="font-medium text-slate-800 mb-2">Xác nhận ngừng thuê box và lấy hàng ?</div>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>Hủy</button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    handleFinishOrder();
                                }}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </>
            </ModalBasic>
        </>
    )
}

export default ConfirmFinishRentModal