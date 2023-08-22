import { Paper } from '@mui/material'
import React from 'react'
import { useMount } from 'ahooks';
import { useState } from 'react';
import getPriceTableBeforeRent from '../../../../services/Customer/getPriceTableBeforeRent';

const ShowPriceTable = ({ storeId, length, height, boxType }) => {
    const [table, setTable] = useState([]);
    const [tableTotal, setTableTotal] = useState(0);
    useMount(() => {
        const payload = {
            storeId: storeId,
            length: length,
            height: height,
            boxType: boxType,
            PageIndex: 1,
            PageSize: 10,
        };
        getPriceTableBeforeRent(payload)
            .then((res) => {
                const newTable = res.items.filter((e) => {
                    if(e?.boxSize?.length == length && e?.boxSize?.height == height && e?.boxType?.name == boxType){
                        return e
                    }
                });
                setTable(newTable);
                setTableTotal(res.totalRecord)
            })
            .catch((err) => {
                console.log(err);
            });
    });
    return (
        <>
            <Paper sx={{ width: '100%', height: '100%' }}>
                <div className=''>
                    <table className="text-heading w-full text-sm font-semibold lg:text-base">
                        <thead className='bg-[#2196f3]'>
                            <tr>
                                {/* <th className="bg-gray-150 w-1/4 p-4 ltr:text-left ltr:first:rounded-tl-md rtl:text-right rtl:first:rounded-tr-md">Kích thước</th>
                                <th className="bg-gray-150 w-1/4 p-4 ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md">Loại box</th> */}
                                <th className="bg-gray-150 w-1/4 p-4 ltr:text-left ltr:first:rounded-tl-md rtl:text-right rtl:first:rounded-tr-md">Thời lượng (phút)</th>
                                <th className="bg-gray-150 w-1/4 p-4 ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md">Giá (đ) / 15 phút</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((row) => (
                                <tr key={row.id} className="border-b border-gray-300 font-normal last:border-b-0">
                                    {/* <td className="p-4 text-center">{row?.boxSize?.length} x {row?.boxSize?.height}</td>
                                    <td className="p-4 text-center">{row?.boxType?.name}</td> */}
                                    <td className="p-4 text-center">{row?.maxDuration ? (row?.minDuration + '-' + row?.maxDuration) : ('>' + row?.minDuration)}</td>
                                    <td className="p-4 text-center">{row?.price}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
            </Paper>
        </>
    )
}

export default ShowPriceTable