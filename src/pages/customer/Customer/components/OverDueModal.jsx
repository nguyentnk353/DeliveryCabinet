import React from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';

const OverDueModal = ({isOpenOverDue, setIsOpenOverDue}) => {
  return (
    <>
     <ModalBasic modalOpen={isOpenOverDue} setModalOpen={setIsOpenOverDue} title="BẢNG GIÁ THUÊ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            Bạn có đơn hàng bị quá hạn, hãy kiểm tra lại và liên hệ cửa hàng để biết thêm chi tiết
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpenOverDue(false);
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

export default OverDueModal