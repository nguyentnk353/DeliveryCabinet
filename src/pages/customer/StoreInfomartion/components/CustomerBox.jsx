import React from 'react'
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useMount } from 'ahooks';
import getAllBox from '../../../../services/Customer/getAllBox';
import { useState } from 'react';

const CustomerBox = ({ isOpen, setIsOpen, setInfoModal, box }) => {
    
    return (
        <>
            <div
                className="hover:shadow-product group box-border flex transform cursor-pointer flex-col items-start overflow-hidden rounded-md bg-[#BBDEFB] pb-2 transition duration-200 ease-in-out hover:-translate-y-1 ltr:pr-0 rtl:pl-0 md:hover:-translate-y-1.5 lg:pb-3"
                role="button"
                title="Box"
                onClick={() => { setIsOpen(true); setInfoModal(box);}}
            >
                <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
                    <h2 className="pr-[5px] mb-1 truncate text-sm font-semibold md:text-[15px] flex items-center">
                        <ViewModuleIcon /> Thông tin box
                    </h2>
                    <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                        Chiều dài: {box?.boxSize?.length}
                    </p>
                    <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                        Chiều rộng: {box?.boxSize?.height}
                    </p>
                    <p className="text-body max-w-[250px] truncate text-xs leading-normal lg:text-sm xl:leading-relaxed">
                        Loại box: {box?.boxType?.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-x-2 text-sm font-semibold sm:text-base lg:mt-2.5 lg:text-lg">
                        <span className="false inline-block">Số lượng: {box?.count}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerBox