import React from 'react'
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useMount } from 'ahooks';
import getAllBox from '../../../../services/Customer/getAllBox';
import { useState } from 'react';

const CustomerBox = ({ isOpen, setIsOpen, lockerId, setLockerId, setInfoModal }) => {
    const [listBox, setListBox] = useState([]);
    const [totalBox, setTotalBox] = useState([]);
    useMount(() => {
        getAllBox(lockerId)
            .then((res) => {
                const newListBoxApi = res.map((e) => e);
                setListBox(newListBoxApi);
                setTotalBox(res.length)
            })
            .catch((err) => {
                console.log(err);
            });
    });
    return (
        <>
            {listBox.map((row, index) => {
                if (row.boxSize.isEnable == true && row.boxType.isEnable == true && row.count != 0) {
                    return (
                        <div
                            className="hover:shadow-product group box-border flex transform cursor-pointer flex-col items-start overflow-hidden rounded-md bg-[#BBDEFB] pb-2 transition duration-200 ease-in-out hover:-translate-y-1 ltr:pr-0 rtl:pl-0 md:hover:-translate-y-1.5 lg:pb-3"
                            role="button"
                            title="Box"
                            key={index}
                            onClick={() => { setIsOpen(true); setInfoModal(row); setLockerId(lockerId) }}
                        >
                            <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
                                <h2 className="pr-[5px] mb-1 truncate text-sm font-semibold md:text-[15px] flex items-center">
                                    <ViewModuleIcon /> Thông tin box
                                </h2>
                                <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                                    Chiều dài: {row?.boxSize?.length} cm
                                </p>
                                <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                                    Chiều rộng: {row?.boxSize?.height} cm
                                </p>
                                <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                                    Loại: {row?.boxType?.name}
                                </p>
                                <div className="mt-1.5 flex flex-wrap gap-x-2 text-sm font-semibold sm:text-base lg:mt-2.5 lg:text-lg">
                                    <span className="false inline-block">Số lượng: {row?.count}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null;
            })}
        </>
    )
}

export default CustomerBox