import React from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';

const GetOpenCodeModal = ({ isOpen, setIsOpen, openCode }) => {
    return (

        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="MÃ CODE MỞ TỦ">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            Mã mở tủ chỉ được sử dụng 1 lần
                        </div>
                        <div className="text-sm">
                            Mã mở tủ: <span className='text-[#14df14]'>{openCode}</span>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
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

export default GetOpenCodeModal