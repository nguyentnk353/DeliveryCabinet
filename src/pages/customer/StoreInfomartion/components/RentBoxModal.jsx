import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import rentBox from '../../../../services/Customer/rentBox';
import useNotification from '../../../../utils/useNotification';
import ShowPriceTable from './ShowPriceTable';
import ModalBasic from './ModalBasic';
import { UnitSizeBox } from '../../../../constant/boxConstant';

const RentBoxModal = ({ isOpen, setIsOpen, boxInfo, storeInfo, serviceTypeId, setLoadFinish}) => {
    const navigate = useNavigate();
    const [msg, sendNotification] = useNotification();
    const [showPrice, setShowPrice] = useState(false);

    const handleRentBox = () => {
        const payload = {
            storeId: storeInfo?.id,
            boxSizeId: boxInfo?.boxSize?.id,
            boxTypeId: boxInfo?.boxType?.id,
            servicetypeId: serviceTypeId,
        }
        rentBox(payload)
            .then(async (res) => {
                setLoadFinish(false);
                if (res.status == 201) {
                    sendNotification({ msg: 'Thuê tủ thành công', variant: 'success' });
                    await new Promise((resolve)=>setTimeout(resolve, 3000))
                    navigate('/customer/order-detail', {
                        state: {
                            orderInfo: res.data,
                            storeInfo: storeInfo,
                        },
                    })
                } else if (res.response.status == 400) {
                    sendNotification({ msg: 'Hiện tại bạn không đủ tiền', variant: 'warning' });

                } else {
                    sendNotification({ msg: 'Không thể tạo đơn hàng', variant: 'error' });
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <ModalBasic modalOpen={isOpen} setModalOpen={setIsOpen} setShowPrice={setShowPrice} title="XÁC NHẬN THUÊ BOX">
                <>
                    {/* Modal content */}
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className='flex justify-end pb-1 text-green-400'
                                onClick={(e)=>{e.stopPropagation(); setShowPrice(true)}}
                            >
                                Xem bảng giá
                            </div>
                            <div className="font-medium text-slate-800 mb-2">Xác nhận thuê box có thông tin sau:</div>
                            <div className="space-y-2">
                                <p>Chiều dài: {boxInfo?.boxSize?.length * UnitSizeBox} cm</p>
                                <p>Chiều rộng: {boxInfo?.boxSize?.height * UnitSizeBox} cm</p>
                                <p>Loại  box: {boxInfo?.boxType?.name}</p>
                                <input></input>
                            </div>
                        </div>
                    </div>
                    {showPrice && (
                        <div>
                            <ShowPriceTable storeId={storeInfo?.id} length={boxInfo?.boxSize?.length} height={boxInfo?.boxSize?.height} boxType={boxInfo?.boxType?.name} />
                        </div>
                    )}

                    {/* Modal footer */}
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setIsOpen(false); setShowPrice(false);}}>Hủy</button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    setLoadFinish(true)
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