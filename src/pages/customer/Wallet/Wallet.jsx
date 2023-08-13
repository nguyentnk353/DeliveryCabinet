import React, { useEffect, useState } from 'react'
import CardsSidebar from './components/CardsSidebar'
import CartTransaction from './components/CartTransaction'
import { useMount } from 'ahooks'
import getLoginUser from '../../../services/Customer/getLoginUser'
import getTransaction from '../../../services/Customer/getTransaction'

const Wallet = () => {

    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(1);
    const [walletInfo, setWalletInfo] = useState({})
    const [info, setInfo] = useState({})
    const [listAll, setListAll] = useState([]);
    const [listTopUp, setListTopUp] = useState([]);
    const [listTrans, setListTrans] = useState([]);
    const [type, setType] = useState('all');
    const [dataTabs, setDataTabs] = useState({ all: 'bg-indigo-500 text-white', topup: 'bg-white text-slate-500', tran: 'bg-white text-slate-500' });

    const handleChangeTabs = (locationa) => {
        setDataTabs({ all: 'bg-white text-slate-500', topup: 'bg-white text-slate-500', tran: 'bg-white text-slate-500' });
        setDataTabs((preState) => ({ ...preState, [locationa]: 'bg-indigo-500 text-white' }));
        switch (locationa) {
            case 'all':
                setType('all');
                break;
            case 'topup':
                setType('topup');
                break;
            case 'tran':
                setType('tran');
                break;
            default:
            // code block
        }
    }

    useMount(() => {
        getLoginUser()
            .then((res) => {
                setInfo(res)
                setWalletInfo(res.wallets[0]);
                getTransaction({ walletId: res.wallets[0]?.id, PageSize: pageSize })
                    .then((trans) => {
                        setListAll(trans.items);

                        setListTopUp(trans.items);
                        setTotal(trans?.totalRecord);
                        const listTopUpApi = trans.items.filter((e) => {
                            if (e?.isIncrease) {
                                return e;
                            }

                        })
                        const listTranApi = trans.items.filter((e) => {
                            if (e?.isIncrease == false) {
                                return e;
                            }

                        })
                        setListTopUp(listTopUpApi);
                        setListTrans(listTranApi);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const handleChangeSize = () => {
        const payload = {
            walletId: walletInfo?.id,
            PageSize: pageSize + 5,
        }

        setPageSize(pageSize + 5);
        getTransaction(payload)
            .then((trans) => {
                setListAll(trans.items);
                setListTopUp(trans.items)
                setTotal(trans?.totalRecord)
                const listTopUpApi = trans.items.filter((e) => {
                    if (e?.isIncrease) {
                        return e;
                    }

                })
                const listTranApi = trans.items.filter((e) => {
                    if (e?.isIncrease == false) {
                        return e;
                    }

                })
                setListTopUp(listTopUpApi);
                setListTrans(listTranApi)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex overflow-hidden bg-[#f1f5f9]">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                <main>
                    <div className="lg:relative lg:flex">

                        {/* Sidebar */}
                        <CardsSidebar info={info} />

                        {/* Content */}
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="sm:flex sm:justify-between sm:items-center mb-5">
                                <div className="mb-4 sm:mb-0">
                                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Lịch sử giao dịch ✨</h1>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="mb-5">
                                <ul className="flex flex-wrap -m-1">
                                    <li className="m-1">
                                        <button className={`${dataTabs.all} border-slate-200 hover:border-slate-300 inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm  duration-150 ease-in-out`} onClick={() => handleChangeTabs('all')}>
                                            Tất cả giao dịch
                                        </button>
                                    </li>
                                    <li className="m-1">
                                        <button className={`${dataTabs.topup} border-slate-200 hover:border-slate-300 inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm  duration-150 ease-in-out`} onClick={() => handleChangeTabs('topup')}>
                                            Nạp tiền
                                        </button>
                                    </li>
                                    <li className="m-1">
                                        <button className={`${dataTabs.tran} border-slate-200 hover:border-slate-300 inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm  duration-150 ease-in-out`} onClick={() => handleChangeTabs('tran')}>
                                            Thanh toán
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* List carts transaction */}

                            {
                                type == 'all' &&
                                listAll.map((tran, index) => (
                                    <div key={index} className="space-y-2">
                                        {/* Cart content */}
                                        <CartTransaction transaction={tran} />
                                    </div>
                                ))
                            }
                            {
                                type == 'topup' &&
                                listTopUp.map((tran, index) => (
                                    <div key={index} className="space-y-2">
                                        {/* Cart content */}
                                        <CartTransaction transaction={tran} />
                                    </div>
                                ))
                            }
                            {
                                type == 'tran' &&
                                listTrans.map((tran, index) => (
                                    <div key={index} className="space-y-2">
                                        {/* Cart content */}
                                        <CartTransaction transaction={tran} />
                                    </div>
                                ))
                            }

                            <div className="py-6 flex justify-center">
                                {pageSize < total ? (
                                    <button className="p-3 rounded-lg text-sm font-medium text-white bg-indigo-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleChangeSize();
                                        }}
                                    >
                                        Load more
                                    </button>
                                ) : (<></>)}
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    )
}

export default Wallet