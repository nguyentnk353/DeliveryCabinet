import React from 'react'
import ModalBasic from '../../components/ModalBasic/ModalBasic';
import PriceTable from '../../StoreInfomartion/components/PriceTable';

const PriceTableModal = ({ isOpen, setIsOpen, storeId, length, height, boxType }) => {

    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="BẢNG GIÁ THUÊ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <PriceTable
                                storeId={storeId}
                                length={length}
                                height={height}
                                boxType={boxType}
                            />
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

export default PriceTableModal