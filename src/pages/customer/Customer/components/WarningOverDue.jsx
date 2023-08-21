import React from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';

const WarningOverDue = ({isOpenWanring, setIsOpenWanring}) => {
  return (
    <>
     <ModalBasic modalOpen={isOpenWanring} setModalOpen={setIsOpenWanring} title="CẢNH BÁO QUÁ HẠN ĐƠN HÀNG">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            Bạn có đơn hàng sắp bị quá hạn do số dư sắp không đủ để thanh toán. Kết thúc đơn hàng hoặc nạp thêm tiền để có thể tiếp tục thuê box. 
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpenWanring(false);
                                }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </>
            </ModalBasic>
    </>
  )
}

export default WarningOverDue