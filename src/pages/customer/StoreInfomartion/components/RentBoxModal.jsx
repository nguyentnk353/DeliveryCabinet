import React from 'react'
import ModalBasic from './../../components/ModalBasic/ModalBasic';
import { useNavigate } from 'react-router-dom';
import rentBox from '../../../../services/Customer/rentBox';
import { useState } from 'react';

const RentBoxModal = ({ isOpen, setIsOpen, boxInfo, lockerId, serviceTypeId }) => {
    const navigate = useNavigate();
   
    const handleRentBox = () => {
        const payload = {
            lockerId: lockerId,
            boxSizeId: boxInfo?.boxSize?.id,
            boxTypeId: boxInfo?.boxType?.id,
            servicetypeId: serviceTypeId,
        }
        rentBox(payload)
            .then((res) => {
                navigate('/customer/order-detail', {
                    state: {
                        orderInfo: res,
                    },
                })
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} title="XÁC NHẬN THUÊ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="font-medium text-slate-800 mb-2">Xác nhận thuê box có thông tin sau:</div>
                            <div className="space-y-2">
                                <p>Chiều dài: {boxInfo?.boxSize?.length} cm</p>
                                <p>Chiều rộng: {boxInfo?.boxSize?.height} cm</p>
                                <p>Loại  box: {boxInfo?.boxType?.name}</p>
                                <input></input>
                            </div>
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
                                    handleRentBox();
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

export default RentBoxModal