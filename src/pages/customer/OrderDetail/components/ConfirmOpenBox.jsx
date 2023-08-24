import React from 'react'
import { useNavigate } from 'react-router-dom';
import ModalBasic from './../../components/ModalBasic/ModalBasic';
import useNotification from '../../../../utils/useNotification';
import openBox from '../../../../services/Customer/openBox';

const ConfirmOpenBox = ({isOpen, setIsOpen, boxId}) => {
    const navigate = useNavigate();
    const [msg, sendNotification] = useNotification();

    const handleFinishOrder = () => {
        openBox(boxId)
            .then(async(res) => {
                if (res.status == 200) {
                    sendNotification({
                      msg: 'Mở tủ thành công',
                      variant: 'success',
                    }); 
                  } else {
                    sendNotification({ msg: 'Số dư tài khoản không đủ', variant: 'error' });
                  }
            })
            .catch((err) => {
                sendNotification({ msg: "Lỗi mở box", variant: 'error' });
        });
    }
    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="XÁC NHẬN MỞ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="font-medium text-slate-800 mb-2">Xác nhận mở tủ để gửi hoặc lấy hàng ?</div>
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

export default ConfirmOpenBox