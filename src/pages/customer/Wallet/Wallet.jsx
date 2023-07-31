import React, { useState } from 'react'
import CardsSidebar from './components/CardsSidebar'
import CartTransaction from './components/CartTransaction'

const Wallet = () => {
    const [walletInfo, setWalletInfo] = useState({})
    const [infoCus, setInfoCus] = useState({})
    return (
        <div className="flex overflow-hidden bg-[#f1f5f9]">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                <main>
                    <div className="lg:relative lg:flex">

                        {/* Sidebar */}
                        <CardsSidebar />

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
                                        <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                                            Tất cả
                                        </button>
                                    </li>
                                    <li className="m-1">
                                        <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                                            Nạp tiền
                                        </button>
                                    </li>
                                    <li className="m-1">
                                        <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                                            Thanh toán
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* List carts transaction */}
                            <div className="space-y-2 hidden">
                                {/* Cart content */}
                                <CartTransaction />
                            </div>

                        </div>

                    </div>
                </main>

            </div>
        </div>
    )
}

export default Wallet