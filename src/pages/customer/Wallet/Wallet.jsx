import React, { useEffect, useState } from 'react'
import CardsSidebar from './components/CardsSidebar'
import CartTransaction from './components/CartTransaction'
import { useMount } from 'ahooks'
import getLoginUser from '../../../services/Customer/getLoginUser'
import getTransaction from '../../../services/Customer/getTransaction'
import NoTransaction from '../../../assets/images/NoTransaction02.gif'


const Wallet = () => {

    const [pageSizeAll, setPageSizeAll] = useState(5);
    const [pageSizeTopup, setPageSizeTopup] = useState(5);
    const [pageSizeTran, setPageSizeTran] = useState(5);
    const [totalAll, setTotalAll] = useState(1);
    const [totalTopup, setTotalTopup] = useState(1);
    const [totalTran, setTotalTran] = useState(1);
    const [walletInfo, setWalletInfo] = useState({})
    const [info, setInfo] = useState({})
    const [listAll, setListAll] = useState([]);
    const [listTopUp, setListTopUp] = useState([]);
    const [listTrans, setListTrans] = useState([]);
    const [type, setType] = useState('all');
    const [load, setLoad] = useState(0);
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
                getTransaction({ walletId: res.wallets[0]?.id, PageSize: pageSizeAll })
                    .then((trans) => {
                        setListAll(trans.items);
                        setTotalAll(trans?.totalRecord);
                        setLoad(1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                getTransaction({ walletId: res.wallets[0]?.id, PageSize: pageSizeTopup, isIncrease: true })
                    .then((trans) => {
                        setListTopUp(trans.items);
                        setTotalTopup(trans?.totalRecord);
                        // setLoad(1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                getTransaction({ walletId: res.wallets[0]?.id, PageSize: pageSizeAll, isIncrease: false })
                    .then((trans) => {
                        setListTrans(trans.items);
                        setTotalTran(trans?.totalRecord);
                        // setLoad(1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const handleChangeSizeAll = () => {
        const payload = {
            walletId: walletInfo?.id,
            PageSize: pageSizeAll + 5,
        }

        setPageSizeAll(pageSizeAll + 5);
        getTransaction(payload)
            .then((trans) => {
                setListAll(trans.items);
                setTotalAll(trans?.totalRecord)
                setLoad(1)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChangeSizeTopup = () => {
        const payload = {
            walletId: walletInfo?.id,
            PageSize: pageSizeTopup + 5,
            isIncrease: true
        }

        setPageSizeTopup(pageSizeTopup + 5);
        getTransaction(payload)
            .then((trans) => {
                setListTopUp(trans.items);
                setTotalTopup(trans?.totalRecord)
                // setLoad(1)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChangeSizeTran = () => {
        const payload = {
            walletId: walletInfo?.id,
            PageSize: pageSizeTran + 5,
            isIncrease: false
        }
        setPageSizeTran(pageSizeTran + 5);
        getTransaction(payload)
            .then((trans) => {
                setListTrans(trans.items);
                setTotalTran(trans?.totalRecord)
                // setLoad(1)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="flex overflow-hidden bg-[#f1f5f9] min-h-screen">
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
                                (load != 0 ? (
                                    listAll?.length != 0 ? (
                                        <div>
                                            {
                                                listAll.map((tran, index) => (
                                                    <div key={index} className="space-y-2">
                                                        {/* Cart content */}
                                                        <CartTransaction transaction={tran} />
                                                    </div>
                                                ))
                                            }
                                            {
                                                pageSizeAll < totalAll &&
                                                <div className="py-6 flex justify-center">
                                                    <button className="p-3 rounded-lg text-sm font-medium text-white bg-indigo-500"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleChangeSizeAll();
                                                        }}
                                                    >
                                                        Xem thêm
                                                    </button>
                                                </div>
                                            }

                                        </div>


                                    ) :
                                        <div>
                                            <div className='flex justify-center sm:hidden'>
                                                <img src={NoTransaction} alt="No Item Found" width='80%' />
                                            </div>
                                            <div className='flex justify-center font-semibold'>Hiện chưa có giao dịch</div>
                                        </div>) : (
                                    <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )
                                )
                            }
                            {
                                type == 'topup' &&
                                listTopUp?.length != 0 && (
                                    <div>
                                        {
                                            listTopUp.map((tran, index) => (
                                                <div key={index} className="space-y-2">
                                                    {/* Cart content */}
                                                    <CartTransaction transaction={tran} />
                                                </div>
                                            ))
                                        }
                                        {
                                            pageSizeTopup < totalTopup &&
                                            <div className="py-6 flex justify-center">
                                                <button className="p-3 rounded-lg text-sm font-medium text-white bg-indigo-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleChangeSizeTopup();
                                                    }}
                                                >
                                                    Xem thêm
                                                </button>
                                            </div>
                                        }

                                    </div>
                                )
                            }
                            {
                                type == 'tran' &&
                                listTrans?.length != 0 && (
                                    <div>
                                        {
                                            listTrans.map((tran, index) => (
                                                <div key={index} className="space-y-2">
                                                    {/* Cart content */}
                                                    <CartTransaction transaction={tran} />
                                                </div>
                                            ))
                                        }
                                        {
                                            pageSizeTran < totalTran &&
                                            <div className="py-6 flex justify-center">
                                                <button className="p-3 rounded-lg text-sm font-medium text-white bg-indigo-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleChangeSizeTran();
                                                    }}
                                                >
                                                    Xem thêm
                                                </button>
                                            </div>
                                        }

                                    </div>)
                            }

                        </div>

                    </div>
                </main>

            </div>
        </div>
    )
}

export default Wallet